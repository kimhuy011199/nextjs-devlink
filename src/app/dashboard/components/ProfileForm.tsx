import FormSection from './FormSection';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ProfileFormProps {
  form: any;
  avatar: string;
}

const ProfileForm = (props: ProfileFormProps) => {
  const { form, avatar } = props;

  const handleUploadAvatar = () => {
    console.log('handleUploadAvatar');
  };

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
                  <Input placeholder="Huy Nguyen K" {...field} />
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
                  <Input placeholder="huynguyenk@gmail.com" {...field} />
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
                <Button
                  variant="ghost"
                  className="h-20 w-20"
                  type="button"
                  onClick={handleUploadAvatar}
                >
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={avatar} alt="@huykim" />
                    <AvatarFallback className="bg-white"></AvatarFallback>
                  </Avatar>
                </Button>
              </FormControl>
              <FormDescription className="text-xs">
                Use .PNG, .JPG format. File size below 100kb.
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
};

export default ProfileForm;
