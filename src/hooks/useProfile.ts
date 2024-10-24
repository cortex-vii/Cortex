import { useEffect, useState } from "react";
import { IProfile } from "@/interfaces/type";

const useProfile = () => {
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  return profile;
};

export default useProfile;
