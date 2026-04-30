import { useEffect, useState } from "react";
import { Link } from "wouter";
import { 
  useListNotes, 
  useUpdateNote, 
  useDeleteNote,
  getListNotesQueryKey,
  getGetDashboardSummaryQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, PenTool, Trash2, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";

export default function NotesList() {
  useEffect(() => {
    document.title = "Notes | RTO Guide 2025";
  }, []);

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: notes, isLoading, isError } = useListNotes();

  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();

  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editNoteBody, setEditNoteBody] = useState("");

  const handleSaveEdit = (noteId: number) => {
    if (!editNoteBody.trim()) return;
    updateNote.mutate(
      { noteId, data: { body: editNoteBody } },
      {
        onSuccess: () => {
          setEditingNoteId(null);
          setEditNoteBody("");
          queryClient.invalidateQueries({ queryKey: getListNotesQueryKey() });
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
          queryClient.invalidateQueries({ queryKey: getListNotesQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
          toast({ title: "Reflection deleted" });
        }
      }
    );
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground flex items-center gap-3">
          Reflections
          <BookOpen className="w-8 h-8 text-indigo-500" />
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">Your personal notes and evidence tracking across all standards.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="py-20 text-center text-destructive">Failed to load notes.</div>
      ) : notes && notes.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {notes.map((note, index) => (
            <div key={note.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${Math.min(index * 50, 500)}ms`, animationFillMode: 'both' }}>
              <Card className="h-full bg-card shadow-sm border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="mb-4">
                    <Link href={`/standards/${note.standardId}`} className="inline-flex items-center text-sm font-medium text-primary hover:underline bg-primary/5 px-2 py-1 rounded-md">
                      Standard {note.standardCode}
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                  
                  {editingNoteId === note.id ? (
                    <div className="space-y-3 flex-1 flex flex-col">
                      <Textarea 
                        value={editNoteBody}
                        onChange={(e) => setEditNoteBody(e.target.value)}
                        className="min-h-[120px] flex-1"
                      />
                      <div className="flex justify-end gap-2 mt-auto pt-2">
                        <Button variant="ghost" size="sm" onClick={() => { setEditingNoteId(null); setEditNoteBody(""); }}>Cancel</Button>
                        <Button size="sm" onClick={() => handleSaveEdit(note.id)} disabled={!editNoteBody.trim() || updateNote.isPending}>Save</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col">
                      <p className="text-foreground whitespace-pre-wrap flex-1 mb-4">{note.body}</p>
                      
                      <div className="flex items-center justify-between pt-3 border-t mt-auto">
                        <span className="text-xs text-muted-foreground">
                          Updated {new Date(note.updatedAt).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400" 
                            onClick={() => { setEditingNoteId(note.id); setEditNoteBody(note.body); }}
                          >
                            <PenTool className="w-4 h-4" />
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                                <Trash2 className="w-4 h-4" />
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
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center flex flex-col items-center bg-card border rounded-2xl shadow-sm">
          <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
            <BookOpen className="w-10 h-10 text-indigo-500" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-foreground">No reflections yet</h3>
          <p className="text-muted-foreground mt-3 max-w-md mb-8 text-lg">
            Use the notes feature on each standard to document your progress, ideas, and evidence.
          </p>
          <Link href="/standards">
            <Button size="lg" className="font-medium">Explore Standards</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
