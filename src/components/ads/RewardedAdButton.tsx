import { useState } from "react";
import { Gift, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface RewardedAdButtonProps {
  onRewardEarned?: () => void;
  className?: string;
}

const RewardedAdButton = ({ onRewardEarned, className = "" }: RewardedAdButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleWatchAd = async () => {
    setLoading(true);
    
    // Simulate ad watching (placeholder behavior)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    toast({
      title: "Reward Earned! 🎉",
      description: "Thank you for watching the ad. Keep up the great work!",
    });
    
    onRewardEarned?.();
  };

  return (
    <Button
      onClick={handleWatchAd}
      disabled={loading}
      variant="outline"
      className={`border-primary/50 text-primary hover:bg-primary/10 ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Watching Ad...
        </>
      ) : (
        <>
          <Gift className="w-4 h-4 mr-2" />
          Watch Ad for Bonus
        </>
      )}
    </Button>
  );
};

export default RewardedAdButton;
