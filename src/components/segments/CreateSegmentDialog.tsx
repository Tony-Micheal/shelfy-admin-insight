
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateSegmentDialog = () => {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    segment: "",
    osaPoints: "",
    plangramsPoints: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating segment:", formData);
    toast({
      title: "Segment created",
      description: "The segment has been created successfully.",
    });
    setOpen(false);
    setFormData({ segment: "", osaPoints: "", plangramsPoints: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Segment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Segment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="segment">Segment Name</Label>
              <Input
                id="segment"
                name="segment"
                value={formData.segment}
                onChange={handleChange}
                placeholder="Enter segment name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="osaPoints">OSA Points</Label>
              <Input
                id="osaPoints"
                name="osaPoints"
                type="number"
                value={formData.osaPoints}
                onChange={handleChange}
                placeholder="Enter OSA points"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="plangramsPoints">Plangrams Points</Label>
              <Input
                id="plangramsPoints"
                name="plangramsPoints"
                type="number"
                value={formData.plangramsPoints}
                onChange={handleChange}
                placeholder="Enter plangrams points"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Segment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSegmentDialog;
