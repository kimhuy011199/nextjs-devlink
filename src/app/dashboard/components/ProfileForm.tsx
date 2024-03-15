import FormSection from './FormSection';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { UploadButton } from '@/lib/uploadthing';

interface ProfileFormProps {
  form: any;
  avatar: string;
  setAvatarValue: (url: string) => void;
  isSubmitting: boolean;
}

const ProfileForm = (props: ProfileFormProps) => {
  const { form, setAvatarValue, isSubmitting } = props;
  const { toast } = useToast();

  return (
    <FormSection
      title="Profile Details"
      description="Add your details to create a personal touch to your profile."
    >
      <div className="bg-gray-100 p-4 rounded-md flex flex-col gap-3">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="flex space-y-0">
              <FormLabel className="w-40 min-w-40 mt-3">Full name</FormLabel>
              <div className="flex flex-col w-full">
                <FormControl>
                  <Input
                    placeholder="Your full name"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex space-y-0">
              <FormLabel className="w-40 min-w-40 mt-3">Email</FormLabel>
              <div className="flex flex-col w-full">
                <FormControl>
                  <Input
                    placeholder="Your email address"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex space-y-0">
              <FormLabel className="w-40 min-w-40 mt-3">Biography</FormLabel>
              <div className="flex flex-col w-full">
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="bg-gray-100 p-4 rounded-md flex flex-col justify-center gap-3 mt-4 mb-2">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex items-center space-y-0 gap-4">
              <FormLabel className="w-36 min-w-36">Profile picture</FormLabel>
              <FormControl>
                <UploadButton
                  className={isSubmitting ? 'submitting' : ''}
                  appearance={{
                    button:
                      'ring-offset-background font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 text-sm border border-primary text-primary bg-transparent after:bg-primary hover:bg-primary/10 ut-uploading:cursor-not-allowed',
                    container: 'flex-row gap-3',
                    allowedContent: 'text-sm text-gray-500',
                  }}
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setAvatarValue(res[0].url);
                    toast({
                      description: 'Your image have been successfully saved!',
                    });
                  }}
                  onUploadError={() => {
                    toast({
                      description: 'Something went wrong! Try another image.',
                      variant: 'destructive',
                    });
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
};

export default ProfileForm;
