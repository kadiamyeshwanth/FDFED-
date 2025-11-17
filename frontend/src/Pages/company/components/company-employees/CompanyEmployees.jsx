import React, { useEffect, useState } from "react";
import "./CompanyEmployees.css";

const CompanyEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/my-employees", {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.employees || []);
      })
      .catch((err) => console.error("Employees API error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="comEmp_container">
      <div className="comEmp_header">
        <h1>My Employees</h1>
      </div>

      {/* Loading */}
      {loading && <p className="comEmp_noEmployees">Loading...</p>}

      {/* Empty State */}
      {!loading && employees.length === 0 && (
        <p className="comEmp_noEmployees">You have no employees yet.</p>
      )}

      <div className="comEmp_grid">
        {employees.map((employee) => (
          <div className="comEmp_card" key={employee._id}>
            {/* HEADER */}
            <div className="comEmp_cardHeader">
              <img
                src={employee.worker.profileImage}
                alt=""
                className="comEmp_profileImg"
              />

              <div className="comEmp_headerInfo">
                <h3>{employee.worker.name}</h3>
                <p className="comEmp_title">
                  {employee.worker.specialization || "Worker"}
                </p>
              </div>
            </div>

            {/* BODY */}
            <div className="comEmp_body">
              <div className="comEmp_detailItem">
                <i className="fas fa-envelope"></i>
                <span>{employee.worker.email}</span>
              </div>

              <div className="comEmp_detailItem">
                <i className="fas fa-phone"></i>
                <span>{employee.worker.phone}</span>
              </div>

              <div className="comEmp_detailItem">
                <i className="fas fa-tools"></i>
                <span>{employee.worker.specialization}</span>
              </div>

              <div className="comEmp_detailItem">
                <i className="fas fa-briefcase"></i>
                <span>
                  {employee.worker.experience || 0} years of experience
                </span>
              </div>

              <div className="comEmp_detailItem">
                <i className="fas fa-calendar-check"></i>
                <span
                  className={`comEmp_availability ${employee.worker.availability}`}
                >
                  {employee.worker.availability || "Available"}
                </span>
              </div>
            </div>

            {/* FOOTER */}
            <div className="comEmp_footer">
              {employee.chatId ? (
                <a href={`/chat/${employee.chatId}`} className="comEmp_btnChat">
                  <i className="fas fa-comment-dots"></i> Chat Now
                </a>
              ) : (
                <button className="comEmp_btnChat disabled">
                  <i className="fas fa-comment-dots"></i> Chat Unavailable
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyEmployees;
