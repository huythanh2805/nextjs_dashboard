"use client";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useState, useRef } from "react";
import { Skeleton } from "./ui/skeleton";
import login from "@/animations/login.json";
import eyes from "@/animations/eyes.json"
import register from "@/animations/register.json"
import loading from "@/animations/loading.json"
import success from "@/animations/success.json"

export const LoginAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  // Kiểm tra khi Lottie animation đã sẵn sàng
  const handleAnimationLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-[750px] flex items-center justify-center">
      {isLoading && <Skeleton className="w-[750px] h-[650px] rounded-lg" />}
      <Lottie
        lottieRef={lottieRef}
        animationData={login}
        onDOMLoaded={handleAnimationLoaded} // Gọi khi animation đã sẵn sàng
      />
    </div>
  );
};
export const RegisterAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  // Kiểm tra khi Lottie animation đã sẵn sàng
  const handleAnimationLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-[750px] flex items-center justify-center">
      {isLoading && <Skeleton className="w-[750px] h-[650px] rounded-lg" />}
      <Lottie
        lottieRef={lottieRef}
        animationData={register}
        onDOMLoaded={handleAnimationLoaded} // Gọi khi animation đã sẵn sàng
      />
    </div>
  );
};
export const EyesAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  // Kiểm tra khi Lottie animation đã sẵn sàng
  const handleAnimationLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full flex items-center justify-center">
      {isLoading && <Skeleton className="w-[150px] h-[46px] rounded-lg" />}
      <Lottie
        lottieRef={lottieRef}
        animationData={eyes}
        onDOMLoaded={handleAnimationLoaded} // Gọi khi animation đã sẵn sàng
      />
    </div>
  );
};
export const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  // Kiểm tra khi Lottie animation đã sẵn sàng
  const handleAnimationLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-[350px] flex items-center justify-center">
      {isLoading && <Skeleton className="w-[350px] h-[262.5px] rounded-lg" />}
      <Lottie
        lottieRef={lottieRef}
        animationData={loading}
        onDOMLoaded={handleAnimationLoaded} // Gọi khi animation đã sẵn sàng
      />
    </div>
  );
};
export const SuccessAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  // Kiểm tra khi Lottie animation đã sẵn sàng
  const handleAnimationLoaded = () => {
    setIsLoading(false);
  };
  const handleAnimationComplete = () => {
    setIsVisible(false); // Ẩn animation sau khi hoàn tất
  };

  return (
    <div className="w-[350px] flex items-center justify-center">
      {isLoading && <div />}
      {
        isVisible && <Lottie
        lottieRef={lottieRef}
        animationData={success}
        loop={false}
        onComplete={handleAnimationComplete} // Gọi khi animation hoàn tất
        onDOMLoaded={handleAnimationLoaded} // Gọi khi animation đã sẵn sàng
      />
      }
    </div>
  );
};
