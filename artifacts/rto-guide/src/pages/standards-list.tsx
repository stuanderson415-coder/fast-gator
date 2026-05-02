import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useListStandards, useListQualityAreas } from "@workspace/api-client-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, LayoutList, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function StandardsList() {
  useEffect(() => {
    document.title = "Standards | RTO Standards Companion";
  }, []);

  const [search, setSearch] = useState("");
  const [qaFilter, setQaFilter] = useState<string>("all");

  const { data: qualityAreas } = useListQualityAreas();
  const { data: standards, isLoading, isError } = useListStandards({
    search: search || undefined,
    qualityAreaId: qaFilter === "all" ? undefined : parseInt(qaFilter),
  });

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Standards</h1>
        <p className="text-muted-foreground mt-2 text-lg">Browse and track your progress across all 18 standards.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search standards..." 
            className="pl-10 bg-card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-64">
          <Select value={qaFilter} onValueChange={setQaFilter}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="All Quality Areas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Quality Areas</SelectItem>
              {qualityAreas?.map(qa => (
                <SelectItem key={qa.id} value={qa.id.toString()}>
                  {qa.code}: {qa.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : isError ? (
        <div className="py-12 text-center text-destructive">Failed to load standards.</div>
      ) : standards && standards.length > 0 ? (
        <div className="space-y-3">
          {standards.map((std, index) => (
            <Link key={std.id} href={`/standards/${std.id}`}>
              <Card className="hover-elevate cursor-pointer hover:border-primary/50 transition-all group overflow-hidden" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {std.code}
                        </span>
                        <span className="text-xs text-muted-foreground hidden sm:inline-block">
                          {std.qualityAreaCode} • {std.qualityAreaTitle}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
                        {std.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{std.intent}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 sm:flex-col sm:items-end">
                      <StatusBadge status={std.status} />
                      <div className="flex items-center gap-2 text-xs text-muted-foreground hidden sm:flex">
                        <span>{std.strategyCount} strategies</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <LayoutList className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium text-foreground">No standards found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          {(search || qaFilter !== "all") && (
            <Button variant="link" onClick={() => { setSearch(""); setQaFilter("all"); }} className="mt-4">
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
