'use client';

import React, { useEffect, useState } from 'react';
import { Check, Copy, Share } from 'lucide-react';
import QRCode from 'react-qr-code';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ShareLinkProps {
  profilePath: string;
}

const ShareLink = (props: ShareLinkProps) => {
  const { profilePath } = props;
  const [isCopied, setIsCopied] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');

  useEffect(() => {
    setProfileUrl(window?.location?.origin + profilePath);
  }, [profilePath]);

  if (!profileUrl) {
    return null;
  }

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(profileUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard:', err);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Share size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent hasCloseButton={true}>
        <DialogHeader>
          <DialogTitle>Share Link</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">
              Anyone who has this link will be able to view this profile.
            </span>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" defaultValue={profileUrl} readOnly />
              </div>
              <Button
                type="button"
                size="sm"
                className="px-3"
                onClick={handleCopyUrl}
              >
                {!isCopied ? (
                  <Copy className="h-4 w-4" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-sm text-muted-foreground">
              Or scan this QR Code to view this profile:
            </span>
            <div className="flex flex-col mx-auto pb-4">
              <QRCode value={profileUrl} size={200} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareLink;
