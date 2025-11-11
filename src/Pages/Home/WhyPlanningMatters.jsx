import React from "react";

const WhyPlanningMatters = () => {
  return (
    <div className="md:max-w-5xl md:mx-auto mx-2 my-8 p-6 text-center bg-gradient-to-r from-secondary to-primary text-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Why Financial Planning Matters</h2>
      <p className="text-lg opacity-90">
        Financial planning helps you prepare for emergencies, achieve your goals, and
        live a stress-free life. It’s not about having more money — it’s about using
        what you have wisely.
      </p>
      <div className="mt-6 flex justify-center gap-6 flex-wrap">
        <div className="card bg-base-200 text-black w-64 shadow-md p-4 rounded-xl">
          <h3 className="font-semibold text-lg mb-2">Goal Setting</h3>
          <p className="text-sm">
            Helps you identify priorities and plan accordingly.
          </p>
        </div>
        <div className="card bg-base-200 text-black w-64 shadow-md p-4 rounded-xl">
          <h3 className="font-semibold text-lg mb-2">Stress Reduction</h3>
          <p className="text-sm">
            Knowing where your money goes keeps you calm and confident.
          </p>
        </div>
        <div className="card bg-base-200 text-black w-64 shadow-md p-4 rounded-xl">
          <h3 className="font-semibold text-lg mb-2">Future Security</h3>
          <p className="text-sm">
            Smart investments today secure your tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyPlanningMatters;
