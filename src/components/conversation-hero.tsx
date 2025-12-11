import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ConversationHeroProps {
  name?: string;
  image?: string;
}

export const ConversationHero = ({
  name = "Member",
  image,
}: ConversationHeroProps) => {
  const avatarFallback = name.charAt(0).toUpperCase();

  return (
    <div className="mt-[88px] mx-5 mb-6">
      <div className="flex items-center gap-x-3 mb-2">
        <Avatar className="w-14 h-14">
          <AvatarImage src={image} />
          <AvatarFallback className="text-3xl">{avatarFallback}</AvatarFallback>
        </Avatar>
        <p className="text-2xl font-bold">{name}</p>
      </div>
      <p className="font-normal text-slate-600">
        여기서 <strong>{name}</strong>님과 대화를 시작해 보세요.
      </p>
    </div>
  );
};
