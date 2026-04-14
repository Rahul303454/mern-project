import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminPurchases() {

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {

    const res = await API.get("/purchase");

    setPurchases(res.data.purchases);

  };

  return (

    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">
        Purchased Courses
      </h2>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200">

          <tr>

            <th className="p-3">User Name</th>

            <th className="p-3">Email</th>

            <th className="p-3">Course</th>

          </tr>

        </thead>

        <tbody>

          {purchases.map((p) => (

            <tr key={p._id} className="border-t text-center">

              <td className="p-3">
                {p.userId?.name}
              </td>

              <td className="p-3">
                {p.userId?.email}
              </td>

              <td className="p-3">
                {p.courseId?.title}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AdminPurchases;