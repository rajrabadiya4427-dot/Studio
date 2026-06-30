import React from "react";
import { ArrowRight } from "lucide-react";

const Btn = () => {


    return (

        <button
       
            className="group relative overflow-hidden md:px-6 md:py-3 py-2 px-3 rounded-full bg-green-500 font-bold text-white transition-all duration-500 flex items-center gap-0 hover:gap-3"
        >
            <span className="relative z-10 whitespace-nowrap">
                Get Started
            </span>

            <ArrowRight
                size={18}
                className="
          relative z-10
          opacity-0
          w-0
          -translate-x-3
          transition-all
          duration-500
          group-hover:opacity-100
          group-hover:w-[18px]
          group-hover:translate-x-0
        "
            />
        </button>

    );
};

export default Btn;