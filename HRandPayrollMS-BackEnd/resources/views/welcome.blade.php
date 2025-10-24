<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HR & Payroll Management System</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 font-sans antialiased">

  <!-- Hero Section -->
  <section class="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-red-600 to-red-400 text-white text-center px-6">
    <h1 class="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
      HR & Payroll Management System
    </h1>
    <p class="text-lg md:text-xl max-w-2xl leading-relaxed opacity-90">
      A modern platform to simplify employee management, payroll, and attendance — designed for efficiency and ease of use.
    </p>
  </section>

  <!-- Info Section -->
  <section class="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
    <div class="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition">
      <h3 class="text-xl font-semibold mb-4 text-red-600">Employee Management</h3>
      <p class="text-gray-600">Organize employee records, roles, and departments with clarity and structure.</p>
    </div>
    <div class="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition">
      <h3 class="text-xl font-semibold mb-4 text-red-600">Payroll System</h3>
      <p class="text-gray-600">Accurate payroll processing and reports in a smooth, modern interface.</p>
    </div>
    <div class="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition">
      <h3 class="text-xl font-semibold mb-4 text-red-600">Attendance Tracking</h3>
      <p class="text-gray-600">Monitor attendance, leaves, and approvals with real-time updates.</p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-100 py-6">
    <div class="text-center text-gray-500 text-sm">
      © {{ date('Y') }} HR & Payroll Management System
    </div>
  </footer>

</body>
</html>
