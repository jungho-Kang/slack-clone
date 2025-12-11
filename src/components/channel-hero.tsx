interface ChannelHeroProps {
  name: string;
  creationTime: number;
}

export const ChannelHero = ({ name, creationTime }: ChannelHeroProps) => {
  return (
    <div className="mt-[88px] mx-5 mb-4">
      <p className="text-2xl font-bold flex items-center mb-2"># {name}</p>
      <p className="font-normal text-slate-600 mb-4">
        #{name} 채널에 오신 걸 환영해요!
        <br />첫 메시지를 남기며 대화를 시작해 보세요.
      </p>
    </div>
  );
};
