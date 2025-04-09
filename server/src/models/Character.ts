import { Schema, model, type Document } from "mongoose";

interface ICharacter extends Document {
  characterName: string;
  description1: string;
  description2?: string;
  catchphrase: string;
  appearance: string;
  personality: {
    traits: string[];
    likes: string[];
    dislikes: string[];
  };
  nicknames: string[];
  breed: string;
  gender: string;
  age: number;
  family: {
    father: string;
    mother: string;
    sister: string;
    uncle: string;
    aunt: string;
    cousins: string[];
    grandparents: {
      maternal: string[];
      paternal: string[];
    };
    children: string[];
  };
  appearanceDetails: {
    fur: string[];
    eyes: string;
    nose: string;
    markings: {
      paws: string;
      outerMuzzle: string;
      eyebrows: string;
      chest: string;
      legs: string;
      arms: string;
      torso: string;
      head: string;
      tail: {
        stem: string;
        tip: string;
      };
      ears: {
        outer: string;
        inner: string;
      };
      muzzle: string;
    };
    furColor: string[];
    distinctiveFeatures: string[];
  };
  hobbies: string[];
  friends: string[];
  firstAppearance: string;
  notableEpisodes: string[];
  funFacts: {
    favoriteAnimal: string;
    favoriteColorOfCapsicum: string;
    favoriteBreakfast: string;
    school: string;
    middleName: string;
    beltRank: {
      start: string;
      current: string;
    };
    canRead: string;
    instrument: string;
    birthdayStatus: {
      lastSeen: string;
      ageConfirmed: number;
      comment: string;
    };
    spokenInShorts: string[];
    mistakenForBoy: boolean;
    emojiAvailableOnDisneyNOW: boolean;
    absentEpisodes: {
      main: string[];
      shorts: string[];
    };
    limitedInformation: string;
  };
}

const characterSchema = new Schema<ICharacter>(
  {
    characterName: {
      type: String,
      required: [
        true,
        "Please add a Character Name. If you need assistance, ask a parent!",
      ],
    },
    description1: {
      type: String,
      required: [
        true,
        "Please add a description. If you need assistance, ask a parent!",
      ],
    },
    description2: {
      type: String,
    },
    catchphrase: {
      type: String,
    },
    appearance: {
      type: String,
    },
    personality: {
      traits: [String],
      likes: [String],
      dislikes: [String],
    },
    nicknames: {
      type: [String],
    },
    breed: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
    },
    family: {
      father: {
        type: String,
      },
      mother: {
        type: String,
      },
      sister: {
        type: String,
      },
      uncle: {
        type: String,
      },
      aunt: {
        type: String,
      },
      cousins: {
        type: [String],
      },
      grandparents: {
        maternal: {
          type: [String],
        },
        paternal: {
          type: [String],
        },
      },
      children: {
        type: [String],
      },
    },
    appearanceDetails: {
      fur: {
        type: [String],
      },
      eyes: {
        type: String,
      },
      nose: {
        type: String,
      },
      markings: {
        paws: {
          type: String,
        },
        outerMuzzle: {
          type: String,
        },
        eyebrows: {
          type: String,
        },
        chest: {
          type: String,
        },
        legs: {
          type: String,
        },
        arms: {
          type: String,
        },
        torso: {
          type: String,
        },
        head: {
          type: String,
        },
        tail: {
          stem: {
            type: String,
          },
          tip: {
            type: String,
          },
        },
        ears: {
          outer: {
            type: String,
          },
          inner: {
            type: String,
          },
        },
        muzzle: {
          type: String,
        },
      },
      furColor: {
        type: [String],
      },
      distinctiveFeatures: {
        type: [String],
      },
    },
    hobbies: {
      type: [String],
    },
    friends: {
      type: [String],
    },
    firstAppearance: {
      type: String,
    },
    notableEpisodes: {
      type: [String],
    },
    funFacts: {
      favoriteAnimal: {
        type: String,
      },
      favoriteColorOfCapsicum: {
        type: String,
      },
      favoriteBreakfast: {
        type: String,
      },
      school: {
        type: String,
      },
      middleName: {
        type: String,
      },
      beltRank: {
        start: {
          type: String,
        },
        current: {
          type: String,
        },
      },
      canRead: {
        type: String,
      },
      instrument: {
        type: String,
      },
      birthdayStatus: {
        lastSeen: {
          type: String,
        },
        ageConfirmed: {
          type: Number,
        },
        comment: {
          type: String,
        },
      },
      spokenInShorts: {
        type: [String],
      },
      mistakenForBoy: {
        type: Boolean,
      },
      emojiAvailableOnDisneyNOW: {
        type: Boolean,
      },
      absentEpisodes: {
        main: {
          type: [String],
        },
        shorts: {
          type: [String],
        },
      },
      limitedInformation: {
        type: String,
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Character = model<ICharacter>("Character", characterSchema);

export default Character;
