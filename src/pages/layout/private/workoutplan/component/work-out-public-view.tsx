import  { useEffect, useState } from "react";
import {
  Dumbbell,
  ChevronDown,
  ChevronUp,
  Info,
  Search,
  Sparkles,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useWorkOutPlanStore } from "../store";
import { IWorkOutDetails } from "../interface";

// Helper for image fallback
const fallbackImg = "https://cdn-icons-png.flaticon.com/512/2331/2331966.png"; // generic dumbbell image

const PublicWorkOutPlans = () => {
  const { businessName } = useParams<{ businessName: string }>();
  const { getPublicView, workOutPlans } = useWorkOutPlanStore();
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [search, setSearch] = useState("");
  const [filteredPlans, setFilteredPlans] = useState<IWorkOutDetails[]>([]);

  useEffect(() => {
    if (businessName) getPublicView(businessName);
    // eslint-disable-next-line
  }, [businessName]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredPlans(workOutPlans || []);
      return;
    }
    setFilteredPlans(
      (workOutPlans || []).filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          (p.workOutTitleListRes || []).some((w) =>
            w.subTitle.toLowerCase().includes(search.toLowerCase())
          )
      )
    );
  }, [workOutPlans, search]);

  const handleExpand = (planId: number) => {
    setExpanded((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  // Only show "No public workout plans available." if filteredPlans is empty, nothing else.
  if (!filteredPlans?.length) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-pink-50 to-indigo-50 font-poppins">
        <Info className="text-gray-400 mb-4" size={40} />
        <h2 className="text-2xl text-gray-400 font-semibold">
          No public workout plans available.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-6 px-2 bg-gradient-to-br from-blue-50 via-pink-50 to-indigo-50 font-poppins">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 px-4 sm:px-6 md:px-8">
          <span className="relative flex items-center justify-center mb-3">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2">
              <Sparkles className="text-indigo-300 animate-pulse" size={32} />
            </span>
            <Dumbbell className="text-indigo-600 drop-shadow-lg" size={40} />
          </span>
          <h1 className="text-3xl sm:text-2xl md:text-4xl font-extrabold text-center text-[#232145] mb-3 drop-shadow-2xl tracking-tight leading-tight">
            Explore{" "}
            <span className="text-[#E26300] underline underline-offset-4 decoration-2 sm:text-4xl md:text-5xl">
              {(businessName ?? "").toUpperCase()}
            </span>{" "}
            Workout Plans
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-md sm:max-w-xl text-center leading-relaxed">
            <span className="inline-block bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full mb-3 text-sm sm:text-base">
              {filteredPlans?.length} plan{filteredPlans?.length !== 1 && "s"}{" "}
              available
            </span>
            <br />
            Achieve your fitness goals with step-by-step visual guides. Search,
            preview, and expand for detailed instructions.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-3 text-gray-400" size={21} />
            <input
              type="text"
              className="pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full text-gray-700 font-medium transition"
              placeholder="Search by plan or exercise name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Plans List */}
        <div className="grid grid-cols-1 gap-7">
          {filteredPlans?.map((plan) => {
            const isExpanded = expanded[plan?.id];
            const workouts = plan?.workOutTitleListRes || [];
            return (
              <div
                key={plan?.id}
                className="bg-white/90 rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col relative group transition hover:shadow-2xl hover:-translate-y-1"
                style={{ minHeight: 220 }}
              >
                {/* Plan Card Header */}
                <button
                  className="flex items-center gap-3 mb-3 w-full text-left group focus:outline-none"
                  onClick={() => handleExpand(plan?.id)}
                  aria-expanded={!!isExpanded}
                >
                  <span className="relative">
                    <Dumbbell
                      className="text-indigo-600 drop-shadow"
                      size={30}
                    />
                  </span>
                  <span className="font-bold text-xl text-[#21213A] truncate flex-1">
                    {plan?.title}
                  </span>
                  <span className="ml-2 text-indigo-600 group-hover:scale-110 transition">
                    {isExpanded ? (
                      <ChevronUp size={26} />
                    ) : (
                      <ChevronDown size={26} />
                    )}
                  </span>
                </button>

                {/* Expandable instruction list */}
                {isExpanded && (
                  <div className="rounded-2xl bg-indigo-50 border border-indigo-100 shadow-inner mt-2 mb-2 px-2 py-4 max-h-[600px] overflow-y-auto hide-scrollbar animate-fadeIn">
                    {workouts?.length === 0 ? (
                      <div className="text-gray-400 text-xs pl-1">
                        No workouts in this plan?.
                      </div>
                    ) : (
                      <ul className="space-y-10">
                        {workouts?.map((workout, idx) => (
                          <li
                            key={workout?.id || idx}
                            className="flex flex-col sm:flex-row items-center gap-9 bg-white/95 rounded-2xl p-5 shadow border border-gray-100"
                          >
                            <a
                              href={workout?.imageName || fallbackImg}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block focus:outline-none hover:ring-4 ring-indigo-200 transition"
                              style={{ minWidth: 170, maxWidth: 300 }}
                              title="Click to view full image"
                            >
                              <img
                                src={workout?.imageName || fallbackImg}
                                alt={workout?.subTitle}
                                className="object-cover w-44 h-44 sm:w-56 sm:h-56 rounded-xl border-2 border-indigo-100 shadow-lg hover:scale-105 transition"
                                onError={(e) =>
                                  (e.currentTarget.src = fallbackImg)
                                }
                              />
                            </a>
                            <div className="flex-1 flex flex-col justify-center">
                              <div className="font-extrabold text-indigo-900 text-xl mb-1">
                                {workout?.subTitle}
                              </div>
                              <div className="text-gray-700 text-lg leading-relaxed max-w-2xl mb-2">
                                {workout?.description ? (
                                  <span>{workout.description}</span>
                                ) : (
                                  <span>
                                    <span className="font-semibold text-indigo-700">
                                      Instructions:
                                    </span>{" "}
                                    <span>
                                      Follow the image and subtitle for correct
                                      posture and movement. Focus on form and
                                      breathing for best results. If you’re
                                      unsure, ask a trainer for help.
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Small preview bar of workouts (avatars) if not expanded */}
                {!isExpanded && workouts?.length > 0 && (
                  <div className="flex -space-x-4 mt-2 mb-1">
                    {workouts?.slice(0, 3).map((workout, idx) => (
                      <a
                        key={workout?.id || idx}
                        href={workout?.imageName || fallbackImg}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={workout?.subTitle}
                        className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow bg-gray-100 flex items-center justify-center hover:ring-2 ring-indigo-300 transition"
                        style={{
                          zIndex: workouts?.length - idx,
                        }}
                      >
                        <img
                          src={workout?.imageName || fallbackImg}
                          alt={workout?.subTitle}
                          className="object-cover w-full h-full"
                          onError={(e) => (e.currentTarget.src = fallbackImg)}
                        />
                      </a>
                    ))}
                    {workouts?.length > 3 && (
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-indigo-100 border-2 border-white text-indigo-600 font-bold text-xs shadow ml-2">
                        +{workouts?.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PublicWorkOutPlans;
