// src/utils/toastManager.ts
import "bootstrap/dist/css/bootstrap.min.css";

let container: HTMLElement | null = null;

export function showToast(
  message: string,
  status: "success" | "error" = "success"
) {
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container position-fixed top-0 end-0 p-3";
    document.body.appendChild(container);
  }

  // Choose color and icon based on status
  const bgClass = status === "success" ? "bg-success" : "bg-danger";
  const icon = status === "success" ? "✔️" : "❌";

  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white ${bgClass} border-0 show mb-2`;
  toast.role = "alert";

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <span class="me-2">${icon}</span>${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto"></button>
    </div>
  `;

  container.appendChild(toast);

  // Close button
  toast.querySelector("button")?.addEventListener("click", () => {
    toast.remove();
  });

  // Auto remove after 3s
  setTimeout(() => toast.remove(), 3000);
}
