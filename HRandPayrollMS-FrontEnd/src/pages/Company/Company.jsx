import { useState } from 'react';
import styles from './Company.module.css';

const Company = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [isEditingHR, setIsEditingHR] = useState(false);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [showAddHRModal, setShowAddHRModal] = useState(false);

  const [companyInfo, setCompanyInfo] = useState({
    name: "SmartHR Solutions",
    established: "2018",
    industry: "Human Resources Technology",
    companyType: "Technology Services",
    employees: 125,
    location: "Dhaka, Bangladesh",
    website: "www.smarthr-solutions.com.bd",
    email: "contact@smarthr-solutions.com.bd",
    phone: "+880 1700-123456",
    description: "SmartHR Solutions is Bangladesh's leading provider of comprehensive human resources management systems, helping local businesses streamline their HR processes and enhance employee experience through innovative technology solutions tailored for the Bangladeshi market."
  });

  const [hrInfo, setHrInfo] = useState({
    name: "Jamila Khatun",
    position: "Chief Human Resources Officer",
    email: "jamila.khatun@smarthr-solutions.com.bd",
    phone: "+880 1800-234567",
    experience: "12 years",
    education: "MBA in Human Resources Management, University of Dhaka",
    certifications: ["CHRP", "SHRM-CP", "BHRM"],
    department: "Human Resources",
    joinDate: "January 2019",
    bio: "Jamila leads our HR initiatives with a focus on employee engagement, talent development, and organizational culture in the Bangladeshi business environment. She brings extensive experience in strategic HR planning and has successfully implemented numerous workforce development programs across various industries in Bangladesh."
  });

  const handleCompanyEdit = (field, value) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHREdit = (field, value) => {
    setHrInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCertificationEdit = (index, value) => {
    setHrInfo(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => i === index ? value : cert)
    }));
  };

  const addCertification = () => {
    setHrInfo(prev => ({
      ...prev,
      certifications: [...prev.certifications, ""]
    }));
  };

  const removeCertification = (index) => {
    setHrInfo(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newCompany = {
      name: formData.get('companyName'),
      established: formData.get('established'),
      industry: formData.get('industry'),
      companyType: formData.get('companyType'),
      employees: parseInt(formData.get('employees')) || 0,
      location: formData.get('location'),
      website: formData.get('website'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      description: formData.get('description')
    };

    setCompanyInfo(newCompany);
    setShowAddCompanyModal(false);
  };

  const handleAddHR = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newHR = {
      name: formData.get('hrName'),
      position: formData.get('position'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      experience: formData.get('experience'),
      education: formData.get('education'),
      certifications: formData.get('certifications') ? formData.get('certifications').split(',').map(cert => cert.trim()) : [],
      department: formData.get('department'),
      joinDate: formData.get('joinDate'),
      bio: formData.get('bio')
    };

    setHrInfo(newHR);
    setShowAddHRModal(false);
  };

  return (
    <section className="px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">Company</h1>
        <p className="text-gray-600 mt-2">Manage company information and organizational details</p>
      </div>

      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className={`mb-6 ${styles.tabNavigation}`}>
          <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${styles.tabButton} ${
                activeTab === 'overview'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Company Overview
            </button>
            <button
              onClick={() => setActiveTab('hr')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${styles.tabButton} ${
                activeTab === 'hr'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              HR Leadership
            </button>
          </nav>
        </div>

        {/* Company Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Add Company Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddCompanyModal(true)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Company Information
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Company Logo & Basic Info */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 h-fit transition-all duration-300 hover:shadow-2xl hover:scale-102 hover:-translate-y-1 cursor-pointer">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-gray-200">
                          <img 
                            src="/images/smarthrlogo.png" 
                            alt="SmartHR Solutions Logo" 
                            className="w-20 h-20 object-contain"
                          />
                        </div>
                        {isEditingCompany ? (
                          <input
                            type="text"
                            value={companyInfo.name}
                            onChange={(e) => handleCompanyEdit('name', e.target.value)}
                            className="text-2xl font-bold text-gray-900 mb-2 text-center w-full border border-gray-300 rounded-lg px-3 py-1"
                          />
                        ) : (
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">{companyInfo.name}</h2>
                        )}
                        {isEditingCompany ? (
                          <input
                            type="text"
                            value={companyInfo.industry}
                            onChange={(e) => handleCompanyEdit('industry', e.target.value)}
                            className="text-gray-600 font-medium w-full border border-gray-300 rounded-lg px-3 py-1 text-center"
                          />
                        ) : (
                          <p className="text-gray-600 font-medium">{companyInfo.industry}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditingCompany(!isEditingCompany)}
                      className="ml-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                      title={isEditingCompany ? "Save changes" : "Edit company info"}
                    >
                      {isEditingCompany ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Established</span>
                      {isEditingCompany ? (
                        <input
                          type="text"
                          value={companyInfo.established}
                          onChange={(e) => handleCompanyEdit('established', e.target.value)}
                          className="font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 text-right w-20"
                        />
                      ) : (
                        <span className="font-semibold text-gray-900">{companyInfo.established}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Employees</span>
                      {isEditingCompany ? (
                        <input
                          type="number"
                          value={companyInfo.employees}
                          onChange={(e) => handleCompanyEdit('employees', parseInt(e.target.value) || 0)}
                          className="font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 text-right w-20"
                        />
                      ) : (
                        <span className="font-semibold text-gray-900">{companyInfo.employees}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Location</span>
                      {isEditingCompany ? (
                        <input
                          type="text"
                          value={companyInfo.location}
                          onChange={(e) => handleCompanyEdit('location', e.target.value)}
                          className="font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 text-right w-32"
                        />
                      ) : (
                        <span className="font-semibold text-gray-900">{companyInfo.location}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Company Information */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-2xl hover:scale-102 hover:-translate-y-1 cursor-pointer">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Company Details</h3>
                    <button
                      onClick={() => setIsEditingCompany(!isEditingCompany)}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-200"
                    >
                      {isEditingCompany ? 'Save Changes' : 'Edit Details'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Website</label>
                        {isEditingCompany ? (
                          <input
                            type="text"
                            value={companyInfo.website}
                            onChange={(e) => handleCompanyEdit('website', e.target.value)}
                            className="w-full text-gray-900 font-medium border border-gray-300 rounded-lg px-3 py-2"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{companyInfo.website}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                        {isEditingCompany ? (
                          <input
                            type="email"
                            value={companyInfo.email}
                            onChange={(e) => handleCompanyEdit('email', e.target.value)}
                            className="w-full text-gray-900 font-medium border border-gray-300 rounded-lg px-3 py-2"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{companyInfo.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Company Type</label>
                        {isEditingCompany ? (
                          <select
                            value={companyInfo.companyType}
                            onChange={(e) => handleCompanyEdit('companyType', e.target.value)}
                            className="w-full text-gray-900 font-medium border border-gray-300 rounded-lg px-3 py-2"
                          >
                            <option value="">Select company type</option>
                            <option value="Technology Services">Technology Services</option>
                            <option value="Software Development">Software Development</option>
                            <option value="Human Resources Technology">Human Resources Technology</option>
                            <option value="Consulting Services">Consulting Services</option>
                            <option value="Financial Services">Financial Services</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Education">Education</option>
                            <option value="Retail">Retail</option>
                            <option value="Non-Profit">Non-Profit</option>
                            <option value="Government">Government</option>
                            <option value="Startup">Startup</option>
                            <option value="Enterprise">Enterprise</option>
                            <option value="Small Business">Small Business</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          <p className="text-gray-900 font-medium">{companyInfo.companyType}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                        {isEditingCompany ? (
                          <input
                            type="tel"
                            value={companyInfo.phone}
                            onChange={(e) => handleCompanyEdit('phone', e.target.value)}
                            className="w-full text-gray-900 font-medium border border-gray-300 rounded-lg px-3 py-2"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{companyInfo.phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Industry</label>
                        {isEditingCompany ? (
                          <input
                            type="text"
                            value={companyInfo.industry}
                            onChange={(e) => handleCompanyEdit('industry', e.target.value)}
                            className="w-full text-gray-900 font-medium border border-gray-300 rounded-lg px-3 py-2"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{companyInfo.industry}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-3">About Company</label>
                    {isEditingCompany ? (
                      <textarea
                        value={companyInfo.description}
                        onChange={(e) => handleCompanyEdit('description', e.target.value)}
                        className="w-full text-gray-700 leading-relaxed border border-gray-300 rounded-lg px-3 py-2"
                        rows="4"
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">{companyInfo.description}</p>
                    )}
                  </div>

                  {/* Company Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600 mb-1">125</div>
                      <div className="text-sm text-gray-600">Total Employees</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">6+</div>
                      <div className="text-sm text-gray-600">Years Established</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
                      <div className="text-sm text-gray-600">Clients Served</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HR Leadership Tab */}
        {activeTab === 'hr' && (
          <div className="space-y-6">
            {/* Add HR Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddHRModal(true)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add HR Information
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* HR Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 h-fit transition-all duration-300 hover:shadow-2xl hover:scale-102 hover:-translate-y-1 cursor-pointer">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        {isEditingHR ? (
                          <input
                            type="text"
                            value={hrInfo.name}
                            onChange={(e) => handleHREdit('name', e.target.value)}
                            className="text-2xl font-bold text-gray-900 mb-1 text-center w-full border border-gray-300 rounded-lg px-3 py-1"
                          />
                        ) : (
                          <h2 className="text-2xl font-bold text-gray-900 mb-1">{hrInfo.name}</h2>
                        )}
                        {isEditingHR ? (
                          <input
                            type="text"
                            value={hrInfo.position}
                            onChange={(e) => handleHREdit('position', e.target.value)}
                            className="text-gray-600 font-medium mb-3 w-full border border-gray-300 rounded-lg px-3 py-1 text-center"
                          />
                        ) : (
                          <p className="text-gray-600 font-medium mb-3">{hrInfo.position}</p>
                        )}
                        <div className="flex items-center justify-center space-x-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditingHR(!isEditingHR)}
                      className="ml-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                      title={isEditingHR ? "Save changes" : "Edit HR info"}
                    >
                      {isEditingHR ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Experience</span>
                      {isEditingHR ? (
                        <input
                          type="text"
                          value={hrInfo.experience}
                          onChange={(e) => handleHREdit('experience', e.target.value)}
                          className="font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 text-right w-24"
                        />
                      ) : (
                        <span className="font-semibold text-gray-900">{hrInfo.experience}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Join Date</span>
                      {isEditingHR ? (
                        <input
                          type="text"
                          value={hrInfo.joinDate}
                          onChange={(e) => handleHREdit('joinDate', e.target.value)}
                          className="font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 text-right w-32"
                        />
                      ) : (
                        <span className="font-semibold text-gray-900">{hrInfo.joinDate}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* HR Detailed Information */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-2xl hover:scale-102 hover:-translate-y-1 cursor-pointer">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">HR Leadership Details</h3>
                    <button
                      onClick={() => setIsEditingHR(!isEditingHR)}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-200"
                    >
                      {isEditingHR ? 'Save Changes' : 'Edit Details'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                        {isEditingHR ? (
                          <input
                            type="email"
                            value={hrInfo.email}
                            onChange={(e) => handleHREdit('email', e.target.value)}
                            className="w-full text-gray-900 font-medium border border-gray-300 rounded-lg px-3 py-2"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{hrInfo.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                        {isEditingHR ? (
                          <input
                            type="tel"
                            value={hrInfo.phone}
                            onChange={(e) => handleHREdit('phone', e.target.value)}
                            className="w-full text-gray-900 font-medium border border-gray-300 rounded-lg px-3 py-2"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{hrInfo.phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
                        {isEditingHR ? (
                          <input
                            type="text"
                            value={hrInfo.department}
                            onChange={(e) => handleHREdit('department', e.target.value)}
                            className="w-full text-gray-900 font-medium border border-gray-300 rounded-lg px-3 py-2"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{hrInfo.department}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Education</label>
                        {isEditingHR ? (
                          <input
                            type="text"
                            value={hrInfo.education}
                            onChange={(e) => handleHREdit('education', e.target.value)}
                            className="w-full text-gray-900 font-medium border border-gray-300 rounded-lg px-3 py-2"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{hrInfo.education}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Certifications</label>
                        {isEditingHR ? (
                          <div className="space-y-2">
                            {hrInfo.certifications.map((cert, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={cert}
                                  onChange={(e) => handleCertificationEdit(index, e.target.value)}
                                  className="flex-1 px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium border border-red-200"
                                />
                                <button
                                  onClick={() => removeCertification(index)}
                                  className="p-1 text-red-600 hover:text-red-800 transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={addCertification}
                              className="mt-2 px-3 py-1 text-sm text-red-600 border border-red-300 rounded-full hover:bg-red-50 transition-colors"
                            >
                              + Add Certification
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {hrInfo.certifications.map((cert, index) => (
                              <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium">
                                {cert}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-3">Professional Background</label>
                    {isEditingHR ? (
                      <textarea
                        value={hrInfo.bio}
                        onChange={(e) => handleHREdit('bio', e.target.value)}
                        className="w-full text-gray-700 leading-relaxed border border-gray-300 rounded-lg px-3 py-2"
                        rows="4"
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">{hrInfo.bio}</p>
                    )}
                  </div>

                  {/* HR Achievements */}
                  <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">95%</div>
                      <div className="text-sm text-gray-600">Employee Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">50+</div>
                      <div className="text-sm text-gray-600">Training Programs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">12</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Company Modal */}
        {showAddCompanyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Add Company Information</h2>
                <button
                  onClick={() => setShowAddCompanyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAddCompany} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Established Year *
                    </label>
                    <input
                      type="text"
                      name="established"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., 2018"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry *
                    </label>
                    <input
                      type="text"
                      name="industry"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter industry"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Type *
                    </label>
                    <select
                      name="companyType"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Select company type</option>
                      <option value="Technology Services">Technology Services</option>
                      <option value="Software Development">Software Development</option>
                      <option value="Human Resources Technology">Human Resources Technology</option>
                      <option value="Consulting Services">Consulting Services</option>
                      <option value="Financial Services">Financial Services</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Education">Education</option>
                      <option value="Retail">Retail</option>
                      <option value="Non-Profit">Non-Profit</option>
                      <option value="Government">Government</option>
                      <option value="Startup">Startup</option>
                      <option value="Enterprise">Enterprise</option>
                      <option value="Small Business">Small Business</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Employees *
                    </label>
                    <input
                      type="number"
                      name="employees"
                      min="1"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter number of employees"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter location"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter website URL"
                    />
                  </div>
                  <div></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter company description..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddCompanyModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Add Company
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add HR Modal */}
        {showAddHRModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Add HR Information</h2>
                <button
                  onClick={() => setShowAddHRModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAddHR} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="hrName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter HR name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position *
                    </label>
                    <input
                      type="text"
                      name="position"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter position title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience *
                    </label>
                    <input
                      type="text"
                      name="experience"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., 12 years"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department *
                    </label>
                    <input
                      type="text"
                      name="department"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter department"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Education *
                    </label>
                    <input
                      type="text"
                      name="education"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter education details"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Join Date *
                    </label>
                    <input
                      type="text"
                      name="joinDate"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., January 2019"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certifications
                  </label>
                  <input
                    type="text"
                    name="certifications"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter certifications separated by commas (e.g., CHRP, SHRM-CP, BHRM)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Professional Background *
                  </label>
                  <textarea
                    name="bio"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter professional background..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddHRModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Add HR Information
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Company;
