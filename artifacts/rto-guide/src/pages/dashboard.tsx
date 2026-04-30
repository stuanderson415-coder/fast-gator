import { useEffect } from "react";
import { Link } from "wouter";
import { useGetDashboardSummary } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BookOpen, Lightbulb, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard | RTO Guide 2025";
  }, []);

  const { data: summary, isLoading, isError } = useGetDashboardSummary();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <h2 className="text-xl font-medium text-destructive">Failed to load dashboard</h2>
        <p className="text-muted-foreground">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Welcome back</h1>
        <p className="text-muted-foreground mt-2 text-lg">Here's your progress with the RTO Standards 2025.</p>
      </div>

      {/* High-level stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{Math.round(summary.overallPercentComplete)}%</div>
            <Progress value={summary.overallPercentComplete} className="h-2 mt-3" />
            <p className="text-xs text-muted-foreground mt-2">{summary.embeddedCount} of {summary.totalStandards} standards embedded</p>
          </CardContent>
        </Card>
        
        <Card className="hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{summary.inProgressCount + summary.planningCount}</div>
            <p className="text-xs text-muted-foreground mt-2">{summary.inProgressCount} active • {summary.planningCount} planning</p>
          </CardContent>
        </Card>
        
        <Card className="hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Favorited Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500 flex items-center gap-2">
              {summary.favoriteCount}
              <Star className="w-5 h-5 fill-current" />
            </div>
            <Link href="/favorites" className="text-xs text-primary hover:underline mt-2 inline-flex items-center gap-1">
              View favorites <ArrowRight className="w-3 h-3" />
            </Link>
          </CardContent>
        </Card>
        
        <Card className="hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Reflection Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-500 flex items-center gap-2">
              {summary.noteCount}
              <BookOpen className="w-5 h-5" />
            </div>
            <Link href="/notes" className="text-xs text-primary hover:underline mt-2 inline-flex items-center gap-1">
              Read notes <ArrowRight className="w-3 h-3" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Quality Areas Progress */}
          <section className="space-y-4">
            <h2 className="text-xl font-serif font-bold">Quality Areas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {summary.qualityAreaProgress.map((qa) => (
                <Link key={qa.qualityAreaId} href={`/quality-areas/${qa.qualityAreaId}`}>
                  <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer hover-elevate">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between items-start">
                        <span>{qa.qualityAreaCode}</span>
                        <span className="text-sm font-normal text-muted-foreground">{Math.round(qa.percentComplete)}%</span>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{qa.qualityAreaTitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress value={qa.percentComplete} className="h-1.5" />
                      <div className="flex gap-2 mt-3 text-xs text-muted-foreground">
                        <span title="Embedded" className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          {qa.embeddedCount}
                        </span>
                        <span title="In Progress" className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-orange-500" />
                          {qa.inProgressCount}
                        </span>
                        <span title="Planning" className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          {qa.planningCount}
                        </span>
                        <span title="Not Started" className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-gray-300" />
                          {qa.notStartedCount}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Notes */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold">Recent Reflections</h2>
              <Link href="/notes">
                <Button variant="ghost" size="sm" className="text-primary">View All</Button>
              </Link>
            </div>
            
            {summary.recentNotes.length > 0 ? (
              <div className="space-y-3">
                {summary.recentNotes.map((note) => (
                  <Card key={note.id} className="hover-elevate">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <Link href={`/standards/${note.standardId}`} className="text-sm font-medium text-primary hover:underline flex items-center gap-1 mb-1">
                            Standard {note.standardCode} <ArrowRight className="w-3 h-3" />
                          </Link>
                          <p className="text-sm text-foreground line-clamp-2">{note.body}</p>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
                          {new Date(note.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50 border-dashed">
                <CardContent className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">No reflections yet</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                      Jot down notes and reflections as you implement strategies to build your evidence base.
                    </p>
                  </div>
                  <Link href="/standards">
                    <Button variant="outline" className="mt-2">Browse Standards</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </section>
        </div>

        <div className="space-y-8">
          {/* Featured Strategy */}
          {summary.featured && (
            <section className="space-y-4">
              <h2 className="text-xl font-serif font-bold flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Strategy of the Day
              </h2>
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg leading-tight">{summary.featured.strategy.title}</CardTitle>
                  <CardDescription className="text-foreground/80 mt-2">
                    <span className="font-medium italic">Why try this?</span> {summary.featured.rationale}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {summary.featured.strategy.summary}
                  </p>
                  <Link href={`/standards/${summary.featured.strategy.standardId}`}>
                    <Button className="w-full justify-between group">
                      View Strategy
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Recently Updated Standards */}
          <section className="space-y-4">
            <h2 className="text-xl font-serif font-bold">Recently Updated</h2>
            {summary.recentlyUpdatedStandards.length > 0 ? (
              <div className="space-y-3">
                {summary.recentlyUpdatedStandards.map((std) => (
                  <Link key={std.id} href={`/standards/${std.id}`}>
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-muted-foreground">{std.code}</span>
                          <span className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">{std.title}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">No standards updated yet.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
