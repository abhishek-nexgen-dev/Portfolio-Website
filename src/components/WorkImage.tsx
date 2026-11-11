import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const handleMouseEnter = () => {
    if (props.video) {
      setIsVideo(true);
      const videoSrc = props.video.startsWith("/") ? props.video : `/${props.video}`;
      setVideo(videoSrc);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <a
        className="group relative inline-block hover:text-inherit! max-[1024px]:block max-[1024px]:w-full"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.link && (
          <div className="pointer-events-none absolute right-[10px] bottom-[10px] z-10 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--backgroundColor)] text-[25px] opacity-0 shadow-[0_0_10px_0_rgba(255,255,255,0.5),inset_0_0_10px_0_#393939] transition-all duration-300 group-hover:opacity-100">
            <MdArrowOutward />
          </div>
        )}
        <img
          className="max-w-full max-[1024px]:max-h-[240px] max-[1024px]:w-full max-[1024px]:rounded-[10px] max-[1024px]:object-cover min-[1025px]:max-h-[350px] [@media(min-width:1025px)_and_(min-height:651px)_and_(max-height:900px)]:max-h-[250px] [@media(max-height:650px)]:max-h-[200px]"
          src={props.image}
          alt={props.alt || "Project preview"}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/placeholder.webp";
          }}
        />
        {isVideo && (
          <video
            className="absolute top-0 left-0 h-full w-full bg-black object-cover"
            src={video}
            autoPlay
            muted
            playsInline
            loop
          ></video>
        )}
      </a>
    </div>
  );
};

export default WorkImage;
