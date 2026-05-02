import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { 
  useGetStandard, 
  useSetProgress,
  useListNotes,
  useCreateNote,
  useUpdateNote,
  useDeleteNote,
  getGetStandardQueryKey,
  getListNotesQueryKey,
  getGetDashboardSummaryQueryKey,
  getListProgressQueryKey,
  getListStandardsQueryKey
} from "@workspace/api-client-react";
import { ProgressStatus } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, CheckCircle, Lightbulb, MessageSquare, Target, Trash2, ShieldCheck, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { StrategyCard } from "@/components/strategy-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function StandardDetail() {
  const { standardId } = useParams();
  const id = parseInt(standardId || "0");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: standard, isLoading, isError } = useGetStandard(id, {
    query: { enabled: !!id, queryKey: getGetStandardQueryKey(id) }
  });

  const { data: notes, isLoading: isLoadingNotes } = useListNotes(
    { standardId: id },
    { query: { enabled: !!id, queryKey: getListNotesQueryKey({ standardId: id }) } }
  );

  const setProgress = useSetProgress();
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();

  const [newNoteBody, setNewNoteBody] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editNoteBody, setEditNoteBody] = useState("");
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);

  useEffect(() => {
    if (standard) {
      document.title = `Standard ${standard.code} | RTO Standards Companion`;
    }
  }, [standard]);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-10 w-96 mb-2" />
          <Skeleton className="h-6 w-64 mb-6" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !standard) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <h2 className="text-xl font-medium text-destructive mb-2">Standard Not Found</h2>
        <p className="text-muted-foreground mb-6">We couldn't find the standard you're looking for.</p>
        <Link href="/standards">
          <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Standards</Button>
        </Link>
      </div>
    );
  }

  const handleStatusChange = (val: ProgressStatus) => {
    setProgress.mutate(
      { standardId: id, data: { status: val } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetStandardQueryKey(id) });
          queryClient.invalidateQueries({ queryKey: getListStandardsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
          queryClient.invalidateQueries({ queryKey: getListProgressQueryKey() });
          
          if (val === ProgressStatus.embedded) {
            toast({
              title: "🎉 Standard embedded!",
              description: "Great work building this into your practice.",
            });
          } else {
            toast({
              title: "Status updated",
              description: `Standard is now marked as ${val.replace('_', ' ')}.`,
            });
          }
        }
      }
    );
  };

  const handleAddNote = () => {
    if (!newNoteBody.trim()) return;
    createNote.mutate(
      { data: { standardId: id, body: newNoteBody } },
      {
        onSuccess: () => {
          setNewNoteBody("");
          setIsNoteDialogOpen(false);
          queryClient.invalidateQueries({ queryKey: getListNotesQueryKey({ standardId: id }) });
          queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
          toast({ title: "Reflection saved" });
        }
      }
    );
  };

  const handleSaveEdit = () => {
    if (!editingNoteId || !editNoteBody.trim()) return;
    updateNote.mutate(
      { noteId: editingNoteId, data: { body: editNoteBody } },
      {
        onSuccess: () => {
          setEditingNoteId(null);
          setEditNoteBody("");
          queryClient.invalidateQueries({ queryKey: getListNotesQueryKey({ standardId: id }) });
          toast({ title: "Reflection updated" });
        }
      }
    );
  };

  const handleDeleteNote = (noteId: number) => {
    deleteNote.mutate(
      { noteId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListNotesQueryKey({ standardId: id }) });
          queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
          toast({ title: "Reflection deleted" });
        }
      }
    );
  };

  const currentStatus = standard.progress?.status || ProgressStatus.not_started;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <Link href={`/quality-areas/${standard.qualityAreaId}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-2">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to {standard.qualityAreaCode}
      </Link>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
              Standard {standard.code}
            </div>
            <StatusBadge status={currentStatus} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-3">{standard.title}</h1>
          <p className="text-lg text-muted-foreground">{standard.intent}</p>
        </div>
        
        <Card className="w-full md:w-72 shrink-0 bg-muted/30 shadow-none border-border">
          <CardContent className="p-5 space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Your Progress</h3>
            <Select value={currentStatus} onValueChange={(val: ProgressStatus) => handleStatusChange(val)}>
              <SelectTrigger className="bg-card w-full">
                <SelectValue placeholder="Update status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ProgressStatus.not_started}>Not Started</SelectItem>
                <SelectItem value={ProgressStatus.planning}>Planning</SelectItem>
                <SelectItem value={ProgressStatus.in_progress}>In Progress</SelectItem>
                <SelectItem value={ProgressStatus.embedded}>Embedded</SelectItem>
              </SelectContent>
            </Select>
            {currentStatus === ProgressStatus.embedded && (
              <div className="flex items-start gap-2 text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 p-3 rounded-md border border-green-200 dark:border-green-900/50">
                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <p>You've successfully integrated this standard into your practice.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-serif flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                What it actually means
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {standard.whatItMeans}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-card shadow-sm border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-serif flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-blue-500" />
                  Key Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {standard.keyPractices.map((practice, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-sm border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-serif flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Evidence Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {standard.evidenceExamples.map((example, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-amber-500" />
                Strategies to try
              </h2>
            </div>
            
            {standard.strategies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {standard.strategies.map((strategy) => (
                  <StrategyCard key={strategy.id} strategy={strategy} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">No strategies listed for this standard yet.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-serif font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-500" />
                Reflections
              </h2>
              
              <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">Add Note</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a reflection</DialogTitle>
                    <DialogDescription>
                      Document how you're implementing this standard or what you've learned.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Textarea 
                      placeholder="Write your reflection here..." 
                      className="min-h-[150px]"
                      value={newNoteBody}
                      onChange={(e) => setNewNoteBody(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddNote} disabled={!newNoteBody.trim() || createNote.isPending}>
                      {createNote.isPending ? "Saving..." : "Save Reflection"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {isLoadingNotes ? (
              <div className="space-y-4">
                {[1, 2].map((i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
              </div>
            ) : notes && notes.length > 0 ? (
              <div className="space-y-4">
                {notes.map((note) => (
                  <Card key={note.id} className="bg-card shadow-sm border-border">
                    <CardContent className="p-4 space-y-3">
                      {editingNoteId === note.id ? (
                        <div className="space-y-3">
                          <Textarea 
                            value={editNoteBody}
                            onChange={(e) => setEditNoteBody(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => { setEditingNoteId(null); setEditNoteBody(""); }}>Cancel</Button>
                            <Button size="sm" onClick={handleSaveEdit} disabled={!editNoteBody.trim() || updateNote.isPending}>Save</Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-foreground whitespace-pre-wrap">{note.body}</p>
                          <div className="flex items-center justify-between pt-2 border-t mt-2">
                            <span className="text-xs text-muted-foreground">{new Date(note.updatedAt).toLocaleDateString()}</span>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditingNoteId(note.id); setEditNoteBody(note.body); }}>
                                <PenTool className="w-3.5 h-3.5 text-muted-foreground" />
                              </Button>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-destructive">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete reflection?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This reflection will be permanently deleted.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteNote(note.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50 border-dashed border-border text-center p-8">
                <BookOpen className="w-8 h-8 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-4">You haven't written any reflections for this standard yet.</p>
                <Button variant="outline" size="sm" onClick={() => setIsNoteDialogOpen(true)}>Start a note</Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
