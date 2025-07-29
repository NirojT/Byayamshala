import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/global/store";
import sideImg from "@/assets/gymmm.png";
import { useBusinessDetailsStore } from "../store";
import Back from "@/global/components/back/back";
import { IFeatureOption } from "@/pages/layout/super/plans/interface";
import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

export default function AccountSettings() {
  const { appUser, setToasterData } = useGlobalStore();
  const [viewQR, setViewQR] = useState(false);

  const {
    getBusinessDetails,
    data,
    setData,
    createBusinessDetails,
    updateBusinessDetails,
    generateQrCode,
    qrCode,
  } = useBusinessDetailsStore();

  // NEW: Track businessName error
  const [businessNameError, setBusinessNameError] = useState("");

  useEffect(() => {
    if (data?.id < 1) {
      getBusinessDetails();
    }
  }, [data?.id]);

  useEffect(() => {
    setData({ ...data, appUserId: appUser?.id });
  }, [appUser]);
  useEffect(() => {
    if (data?.businessName && viewQR) {
      generateQrCode(data?.businessName);
    }
  }, [data, viewQR]);

  // handler
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target as HTMLInputElement;

    // NEW: Prevent whitespace in businessName as user types
    if (name === "businessName") {
      if (/\s/.test(value)) {
        setBusinessNameError("Business name cannot contain whitespace.");
      } else {
        setBusinessNameError("");
      }
      setData({ ...data, [name]: value });
      return;
    }

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setData({
        ...data,
        image: file,
      });
    } else {
      setData({ ...data, [name]: value });
    }
  }

  // update
  async function handleBusinessDetailsUpdate() {
    // NEW: Validate businessName before submitting
    if (/\s/.test(data?.businessName || "")) {
      setBusinessNameError("Business name cannot contain whitespace.");
      setToasterData({
        message: "Business name cannot contain whitespace.",
        severity: "error",
        open: true,
      });
      return;
    }

    let res;
    if (data?.id === 0) {
      res = await createBusinessDetails();
    } else {
      res = await updateBusinessDetails();
    }

    if (res) {
      setToasterData({
        message: res?.message,
        severity: res?.severity,
        open: true,
      });
    }
  }

  function getDisplayImage() {
    if (data?.image instanceof File) {
      return URL.createObjectURL(data?.image);
    }
    return data?.imageName || sideImg;
  }

  const [numbers, setNumbers] = useState<IFeatureOption[]>([]);
  const handleFeaturesChange = (
    selectedOptions: MultiValue<IFeatureOption>
  ) => {
    const phoneArray = selectedOptions?.map((option) => option.value) || [];
    setNumbers([...selectedOptions]);
    setData({ ...data, businessPartnerPhones: phoneArray.join(",") });
  };

  useEffect(() => {
    if (data.businessPartnerPhonesList) {
      const numbersArray =
        data?.businessPartnerPhonesList.map((phone) => ({
          label: phone,
          value: phone,
        })) || [];
      setNumbers(numbersArray);
    }
  }, [data.businessPartnerPhonesList]);
  const formFields = [
    {
      label: "Business Name",
      name: "businessName",
      value: data?.businessName,
      placeholder: "Enter your business name",
    },
    {
      label: "Cafe Name",
      name: "cafeName",
      value: data?.cafeName,
      placeholder: "Enter your cafe name",
    },
    {
      label: "Address",
      name: "businessAddress",
      value: data?.businessAddress,
      placeholder: "Enter your address",
    },
    {
      label: "Phone Number",
      name: "businessPhone",
      value: data?.businessPhone,
      placeholder: "Enter your phone number",
      type: "tel",
    },
    {
      label: "PAN Number",
      name: "panNo",
      value: data?.panNo,
      placeholder: "Enter your PAN number",
    },
    {
      label: "Business Logo",
      name: "image",
      value: data?.image,
      placeholder: "Select the logo",
      type: "file",
    },
  ].filter(Boolean);

  // Modern toggle design for QR code
  function QRCodeToggle() {
    return (
      <div className="flex items-center justify-center gap-4 w-full md:w-1/2 py-4">
        <span className="text-sm font-medium text-gray-500">QR</span>
        <button
          type="button"
          onClick={() => setViewQR((prev) => !prev)}
          aria-pressed={viewQR}
          className={`relative inline-flex h-7 w-14 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#E26003]
            ${viewQR ? "bg-[#E26003]" : "bg-gray-300"}
          `}
        >
          <span
            className={`inline-block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-300
              ${viewQR ? "translate-x-7" : "translate-x-1"}
            `}
          />
        </button>
        <span
          className={`text-xs transition-colors ${
            viewQR ? "text-[#E26003]" : "text-gray-400"
          }`}
        >
          {viewQR ? "On" : "Off"}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full   p-5 min-h-screen items-center justify-center bg-gradient-to-br   via-zinc-900   gap-10">
      {/* Form Section */}
      <div className="w-full md:w-1/2 space-y-8 p-8 bg-white/5 border backdrop-blur-md   shadow-lg rounded-2xl">
        <p className="text-center capitalize text-2xl font-semibold tracking-wide  ">
          {data?.id < 0 ? "Create" : "Update"} Your Account Details
        </p>
        <Back />
        <div className="grid md:grid-cols-2 gap-6">
          {formFields.map(
            ({ label, name, value, placeholder, type = "text" }) => (
              <div className="space-y-2" key={name}>
                <Label htmlFor={name} className="text-sm font-medium  ">
                  {label}
                </Label>
                {type === "file" ? (
                  <input
                    id={name}
                    name={name}
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                  />
                ) : (
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={value as string}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors
                      ${
                        name === "businessName" && businessNameError
                          ? "border-b-red-500"
                          : ""
                      }
                    `}
                  />
                )}
                {/* NEW: Show error if businessName has whitespace */}
                {name === "businessName" && businessNameError && (
                  <p className="text-xs text-red-500">{businessNameError}</p>
                )}
                {type === "file" && data?.imageName && (
                  <p className="text-xs text-gray-400">
                    Selected: {data?.image?.name || "No file selected"}
                  </p>
                )}
              </div>
            )
          )}
        </div>
        {/* React-Select MultiSelect Creatable for Features */}
        <CreatableSelect
          isMulti
          options={data?.businessPartnerPhonesList?.map((phone) => ({
            label: phone,
            value: phone,
          }))}
          value={numbers}
          onChange={handleFeaturesChange}
          placeholder="Add Business Partner Numbers..."
          className="react-select-container"
          classNamePrefix="react-select"
        />

        {/* Submit Button */}
        <div className="w-full flex justify-center pt-4">
          <button
            onClick={handleBusinessDetailsUpdate}
            className="bg-[#E26003] hover:bg-[#ff7f38]  text-white font-medium px-8 py-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#E26003]"
            disabled={!!businessNameError}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2  h-1/2 flex justify-center items-center">

      {!viewQR && (
 <img
          src={getDisplayImage()}
          alt="Account"
          className="rounded-2xl border-2 w-full h-full max-w-md object-cover shadow-lg shadow-[#E26003] hover:border-[#E26003] transition-all duration-300 ease-in-out"
        /> 

      )}
       
        {/* QR Code Toggle Section */}
        <QRCodeToggle />
        {/* QR Code Section */}
      </div>

      {viewQR && (
        <div className="w-full md:w-1/2  h-1/2 flex justify-center items-center">
          <img
            src={qrCode}
            alt="Account QR"
            className="rounded-2xl border-2 w-full h-full max-w-md object-cover shadow-lg shadow-[#E26003] hover:border-[#E26003] transition-all duration-300 ease-in-out"
          />
        </div>
      )}
    </div>
  );
}
