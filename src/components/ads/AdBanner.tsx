interface AdBannerProps {
  className?: string;
}

const AdBanner = ({ className = "" }: AdBannerProps) => {
  return (
    <div 
      className={`w-full bg-secondary/80 border-t border-border flex items-center justify-center ${className}`}
      style={{ height: "50px" }}
    >
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <span className="px-2 py-0.5 rounded bg-muted text-xs font-medium">AD</span>
        <span>AdMob Banner Placeholder</span>
      </div>
    </div>
  );
};

export default AdBanner;
