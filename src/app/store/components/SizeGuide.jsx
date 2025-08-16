import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

const SizeGuide = ({ url, isOpen, onClose }) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="md:max-w-4xl">
          <DialogHeader>
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          <Image
            src={url}
            className="rounded-md"
            alt="Guia de tallas"
            width={1000}
            height={1000}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SizeGuide;
