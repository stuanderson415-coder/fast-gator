import { useEffect } from "react";
import { Link } from "wouter";
import { useListFavorites } from "@workspace/api-client-react";
import { StrategyCard } from "@/components/strategy-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FavoritesList() {
  useEffect(() => {
    document.title = "Favorites | RTO Standards Companion";
  }, []);

  const { data: favorites, isLoading, isError } = useListFavorites();

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground flex items-center gap-3">
          Favorites
          <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">Your curated collection of go-to strategies and quick wins.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-80 w-full rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="py-20 text-center text-destructive">Failed to load favorites.</div>
      ) : favorites && favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favorites.map((fav, index) => (
            <div key={fav.strategyId} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${Math.min(index * 50, 500)}ms`, animationFillMode: 'both' }}>
              <StrategyCard strategy={fav.strategy} showStandardLink={true} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center flex flex-col items-center bg-card border rounded-2xl shadow-sm">
          <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6">
            <Star className="w-10 h-10 text-amber-500" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-foreground">No favorites yet</h3>
          <p className="text-muted-foreground mt-3 max-w-md mb-8 text-lg">
            As you browse through the standards, click the star icon on strategies you want to keep handy for Monday morning.
          </p>
          <Link href="/strategies">
            <Button size="lg" className="font-medium">Browse Strategies</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
