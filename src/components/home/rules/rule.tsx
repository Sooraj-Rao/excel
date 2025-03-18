import React from "react";
import {
  ScrollText,
  Book,
  Users,
  School,
  Theater,
  Edit,
  Trophy,
  Phone,
  MonitorCheck,
} from "lucide-react";

const GeneralRules = () => {
  return (
    <div className="bg-[#2b1b0f8c] mx-3 sm:mx-auto text-amber-200 p-6 rounded-xl shadow-lg border border-amber-800 lg:max-w-2xl w-fit text-justify mt-10 relative">
      {/* Header */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-amber-800 px-4 py-2 rounded-full shadow-md flex items-center gap-2">
        <ScrollText className="h-5 w-5 text-amber-300" />
        <h2 className="text-sm lg:text-lg w-full font-bold text-amber-100">
          General Rules
        </h2>
      </div>

      {/* Rules Post */}
      <div className="mt-10 sm:mt-5 space-y-2 sm:space-y-5 text-sm lg:text-base leading-relaxed">
        <div className="flex items-start gap-2">
          <Book className="h-5 w-5 text-amber-300" />
          <p>Excel 4.0 is open to all BCA/BSc (CS) students.</p>
        </div>

        <div className="flex items-start gap-2">
          <Edit className=" h-8 sm:h-5 w-8 sm:w-5 text-amber-300" />
          <p>
            <strong>Free Entry for all participants,</strong> Team registration
            must be completed by March 26, 2025.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <Users className="h-5 w-5 text-amber-300" />
          <p>A team must consist of no more than 15 members.</p>
        </div>

        <div className="flex items-start gap-2">
          <School className="h-5 w-5 text-amber-300" />
          <p>
            Any number of teams from a college can participate in the events.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <Theater className="h-5 w-5 text-amber-300" />
          <p>One participant can only participate in at most 2 events.</p>
        </div>

        <div className="flex items-start gap-2">
          <MonitorCheck className="h-5 w-5 text-amber-300" />
          <p>
            Participation in all events is mandatory to qualify for the overall
            championship.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <Phone className="h-5 w-5 text-amber-300" />
          <p>
            For more information about the events, please contact the respective
            event heads.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralRules;
