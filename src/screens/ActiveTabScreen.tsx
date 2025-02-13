import React from "react";
import { useGetActivityLogsQuery } from "../store/query/activityApi";

const ActivityTabScreen = () => {
  const { data: logs, isLoading, error } = useGetActivityLogsQuery();
  const activityLogs = logs || [];

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 border-b pb-3 mb-5">
          📝 Activity Logs
        </h2>

        {/* Loading and Error States */}
        {isLoading && (
          <p className="text-gray-500 text-center italic">Loading logs...</p>
        )}
        {error && (
          <p className="text-red-500 text-center italic">
            Failed to load logs.
          </p>
        )}

        {/* Activity Logs List */}
        <ul className="space-y-4">
          {activityLogs.length > 0 ? (
            activityLogs.map((log) => (
              <li
                key={log.id}
                className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform hover:scale-105"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-bold">
                    {new Date(log.timeStamp).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-700 font-medium">{log.message}</p>

                {/* If message contains JSON data, format it */}
                {log.message.includes("{") && (
                  <pre className="mt-2 p-2 bg-gray-200 text-xs text-gray-600 rounded-lg overflow-auto max-h-40">
                    {JSON.stringify(
                      JSON.parse(log.message.split(": ")[1]),
                      null,
                      2
                    )}
                  </pre>
                )}
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center italic">
              No activity logs available.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ActivityTabScreen;
