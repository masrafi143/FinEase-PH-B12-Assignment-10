import React from "react";

const Tips = () => {
  return (
    <div className="md:max-w-4xl md:mx-auto mx-2 mt-8 p-6 bg-base-200 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary text-center mb-6">
        Budgeting Tips
      </h2>

      <ul className="space-y-3 list-disc list-inside text-gray-700">
        <li className="text-lg">
          Set a monthly budget and track your spending regularly.
        </li>
        <li className="text-lg">Always save at least 20% of your income.</li>
        <li className="text-lg">
          Avoid impulse purchases — wait 24 hours before buying.
        </li>
        <li className="text-lg">
          Use digital tools to monitor your expenses easily.
        </li>
      </ul>
    </div>
  );
};

export default Tips;
