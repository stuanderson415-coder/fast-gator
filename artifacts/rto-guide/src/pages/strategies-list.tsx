import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useListStrategies } from "@workspace/api-client-react";
import { StrategyCategory, StrategyEffort } from "@workspace/api-client-react";
import { StrategyCard } from "@/components/strategy-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CATEGORIES = Object.values(StrategyCategory);
const EFFORTS = Object.values(StrategyEffort);

function formatEnumLabel(value: string) {
  return value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default function StrategiesList() {
  useEffect(() => {
    document.title = "Strategies | RTO Guide 2025";
  }, []);

  const [categoryFilter, setCategoryFilter] = useState<StrategyCategory | "all">("all");
  const [effortFilter, setEffortFilter] = useState<StrategyEffort | "all">("all");

  const { data: strategies, isLoading, isError } = useListStrategies({
    category: categoryFilter === "all" ? undefined : categoryFilter as StrategyCategory,
    effort: effortFilter === "all" ? undefined : effortFilter as StrategyEffort,
  });

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Strategies</h1>
        <p className="text-muted-foreground mt-2 text-lg">Practical, Monday-morning actions to build your evidence base.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-muted/30 p-4 rounded-xl border">
        <div className="w-full sm:w-64">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Category</label>
          <Select value={categoryFilter} onValueChange={(val: any) => setCategoryFilter(val)}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map(c => (
                <SelectItem key={c} value={c}>{formatEnumLabel(c)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-64">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Effort</label>
          <Select value={effortFilter} onValueChange={(val: any) => setEffortFilter(val)}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="All Effort Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Effort Levels</SelectItem>
              {EFFORTS.map(e => (
                <SelectItem key={e} value={e}>{formatEnumLabel(e)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {(categoryFilter !== "all" || effortFilter !== "all") && (
          <div className="flex items-end">
            <Button variant="ghost" onClick={() => { setCategoryFilter("all"); setEffortFilter("all"); }} className="mb-0.5">
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-80 w-full rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="py-20 text-center text-destructive">Failed to load strategies.</div>
      ) : strategies && strategies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {strategies.map((strategy, index) => (
            <div key={strategy.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${Math.min(index * 50, 500)}ms`, animationFillMode: 'both' }}>
              <StrategyCard strategy={strategy} showStandardLink={true} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Lightbulb className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium text-foreground">No strategies found</h3>
          <p className="text-muted-foreground mt-2 max-w-md">We couldn't find any strategies matching your current filters.</p>
        </div>
      )}
    </div>
  );
}
