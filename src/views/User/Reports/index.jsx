import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import Layout from "../Layout";
import axios from "axios";
import toast from "react-hot-toast";

const Reports = () => (
  <Layout>
    <Component />
  </Layout>
);

export default Reports;

const Component = () => {
  const { user } = useUser();
  const [reports, setReports] = useState([]);
  const [feedbackInput, setFeedbackInput] = useState({});

  useEffect(() => {
    if (user?._id) getReports();
  }, [user]);

  const getReports = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/reports/${user._id}`
      );
      setReports(response.data || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleFeedbackSubmit = async (reportId) => {
    if (!feedbackInput[reportId]) return;

    try {
      await axios.put(`http://localhost:5000/api/user/report/feedback`, {
        feedback: feedbackInput[reportId],
        reportId,
      });

      toast.success("Feedback submitted");
      getReports();
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Reports</h1>

      <div className="space-y-6">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div
              key={report._id}
              className="bg-base-200 p-6 rounded-xl shadow flex flex-col gap-3"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={report.productId.images || "/Images/placeholder.png"}
                  alt={report.productId.title}
                  className="h-20 w-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-xl font-semibold">
                    {report.productId.title}
                  </h2>
                  <p className="text-sm text-base-content/70">
                    Reason: <strong>{report.reason}</strong>
                  </p>
                  <p className="text-base-content/80">{report.description}</p>
                  <p className="text-sm mt-2 text-base-content/60">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        report.status === "Pending"
                          ? "text-warning"
                          : "text-success"
                      }`}
                    >
                      {report.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Owner Feedback Section */}
              {user._id === report.ownerId._id ? (
                <div className="mt-4">
                  <textarea
                    placeholder="Write your feedback to the reporter..."
                    className="textarea textarea-bordered w-full mb-2"
                    value={feedbackInput[report._id] || ""}
                    onChange={(e) =>
                      setFeedbackInput({
                        ...feedbackInput,
                        [report._id]: e.target.value,
                      })
                    }
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => handleFeedbackSubmit(report._id)}
                  >
                    Submit Feedback
                  </button>
                </div>
              ) : report.feedback ? (
                <div className="bg-base-100 p-4 rounded mt-3 border">
                  <p className="font-semibold text-base-content/80">
                    Owner's Feedback:
                  </p>
                  <p>{report.feedback}</p>
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No reports found.</p>
        )}
      </div>
    </>
  );
};
