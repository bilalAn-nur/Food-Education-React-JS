import { useState } from "react";
import axios from "axios";
import { apiConfig } from "../../ApiResep/config";

const Calculator = () => {
  const [foodQuery, setFoodQuery] = useState("");
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${apiConfig.urlspoonacular}food/ingredients/search`,
        {
          params: {
            query: `${foodQuery}`,
            apiKey: apiConfig.appKeyspoonacular,
          },
        }
      );
      setNutritionData(response.data);
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 shadow-lg max-w-md">
      <h1 className="text-3xl font-bold mb-4">Nutrition Calculator</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Nama Makanan:
        </label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded-md"
          value={foodQuery}
          onChange={(e) => setFoodQuery(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        onClick={handleCalculate}>
        Search
      </button>
      {loading && <p>Loading...</p>}
      {nutritionData && Array.isArray(nutritionData) && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Nutrition Information</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Amount</th>
                <th className="border border-gray-300 p-2">Unit</th>
                <th className="border border-gray-300 p-2">Calories</th>
              </tr>
            </thead>
            <tbody>
              {nutritionData.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{item.name}</td>
                  <td className="border border-gray-300 p-2">{item.amount}</td>
                  <td className="border border-gray-300 p-2">{item.unit}</td>
                  <td className="border border-gray-300 p-2">
                    {item.calories}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Calculator;
