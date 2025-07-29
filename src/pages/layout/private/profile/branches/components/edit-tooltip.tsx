import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const  ShadtoolTip= ({
  icon,
  tooltipTitle,
}: {
  icon: React.ReactNode;
  tooltipTitle: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{icon}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltipTitle}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ShadtoolTip;
