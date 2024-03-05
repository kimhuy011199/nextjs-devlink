import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import QRCode from 'react-qr-code';

interface ProfileQRCodeProps {
  qrCodeUrl: string;
}

const ProfileQRCode = (props: ProfileQRCodeProps) => {
  const { qrCodeUrl } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">QR Code</Button>
      </DialogTrigger>
      <DialogContent className="w-72">
        <DialogHeader>
          <DialogTitle className="text-center">
            Scan to view my profile
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col mx-auto py-4">
          <QRCode value={qrCodeUrl} size={200} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileQRCode;
