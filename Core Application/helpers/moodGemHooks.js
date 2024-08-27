import { useState, useEffect } from "react";

import {
  GemRage,
  GemBliss,
  GemEgo,
  GemFear,
  GemLove,
  GemLust,
  GemPeace
} from "components/assets/Gems";
import moodApi from "../services/moodApi";

export const moodGem = gem => {
  switch (gem) {
    case "aggression":
    case "rage": {
      return <GemRage />;
    }
    case "happiness":
    case "bliss": {
      return <GemBliss />;
    }
    case "confidence":
    case "ego": {
      return <GemEgo />;
    }
    case "thrill":
    case "fear": {
      return <GemFear />;
    }
    case "sentimental":
    case "love": {
      return <GemLove />;
    }
    case "sexy":
    case "lust": {
      return <GemLust />;
    }
    case "chill":
    case "peace": {
      return <GemPeace />;
    }
    default: {
      return <></>;
    }
  }
};

const moodKey = {
  aggression: "rage",
  thrill: "fear",
  confidence: "ego",
  happiness: "bliss",
  chill: "peace",
  sentimental: "love",
  sexy: "lust"
};

export const useMoodTagging = (additionalMoods = {}) => {
  const moods = {
    // aggression: false,
    // thrill: false,
    confidence: false,
    happiness: false,
    chill: false,
    sentimental: false,
    // sexy: false,
    ...additionalMoods
  };

  const [moodGems, setMoodGems] = useState(moods);
  const [gemChanged, setGemChanged] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateGems = (gem, value) => {
    let tempMoodGems = moodGems;
    tempMoodGems[gem] = value;
    setMoodGems(tempMoodGems);
    setGemChanged(gemChanged + 1);
  };

  const resetGems = () => {
    setMoodGems(moods);
    setGemChanged(gemChanged + 1);
    setSubmitted(false);
    setIsFetching(false);
  };

  const submitTag = function(user_id, song_id) {
    setIsFetching(true);
    const taggedMoods = {};
    for (const [key, value] of Object.entries(moodGems)) {
      const kMood = moodKey[key];
      taggedMoods[kMood] = value === false ? 0 : 1;
    }

    moodApi
      .post("/ms_api/tagMood", {
        user_id: user_id,
        mood: taggedMoods,
        song_id: song_id
      })
      .then(r => {
        if (r.error) {
          console.error("Mood was not tagged properly", r.error);
        } else {
          console.log("TAG MOOD", r);
        }
        setIsFetching(false);
        setSubmitted(true);
      })
      .catch(function(error) {
        console.error("Mood was not tagged properly", error);
      });
  };

  return {
    moodGems,
    gemChanged,
    updateGems,
    resetGems,
    isFetching,
    submitted,
    setSubmitted,
    submitTag
  };
};
