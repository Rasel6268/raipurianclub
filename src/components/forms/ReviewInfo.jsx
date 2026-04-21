// components/forms/ReviewInfo.jsx
import { useState } from 'react';

export default function ReviewInfo({ watch }) {
  const formData = watch();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Review Your Information</h2>

      {/* Profile Image */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Profile Image</h3>
        <div className="flex items-center space-x-4">
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="flex-1"
          />
        </div>
      </div>

      {/* Personal Information */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Personal Information</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">Name:</span>
            <span className="ml-2 font-medium">{formData.name}</span>
          </div>
          <div>
            <span className="text-gray-600">Email:</span>
            <span className="ml-2 font-medium">{formData.email}</span>
          </div>
          <div>
            <span className="text-gray-600">Phone:</span>
            <span className="ml-2 font-medium">{formData.phone}</span>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Address Information</h3>
        <div className="space-y-3">
          <div>
            <p className="font-medium text-gray-700">Permanent Address:</p>
            <p className="text-sm text-gray-600 ml-2">
              {formData.permanentAddress?.street}, {formData.permanentAddress?.city}, 
              {formData.permanentAddress?.state} - {formData.permanentAddress?.postalCode}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Present Address:</p>
            <p className="text-sm text-gray-600 ml-2">
              {formData.presentAddress?.sameAsPermanent ? 
                'Same as permanent address' : 
                `${formData.presentAddress?.street}, ${formData.presentAddress?.city}, 
                ${formData.presentAddress?.state} - ${formData.presentAddress?.postalCode}`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Educational Qualifications</h3>
        {formData.educationalQualification?.map((edu, idx) => (
          <div key={idx} className="mb-3 pb-2 border-b last:border-0">
            <p className="font-medium">{edu.degree}</p>
            <p className="text-sm text-gray-600">{edu.institution}</p>
            {edu.yearOfPassing && <p className="text-xs text-gray-500">Year: {edu.yearOfPassing}</p>}
            {edu.grade && <p className="text-xs text-gray-500">Grade: {edu.grade}</p>}
          </div>
        ))}
      </div>

      {/* Occupation */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Occupation</h3>
        <p className="capitalize">{formData.occupation}</p>
        {formData.occupationDetails?.companyName && (
          <div className="mt-2 text-sm text-gray-600">
            <p>Company: {formData.occupationDetails.companyName}</p>
            <p>Position: {formData.occupationDetails.position}</p>
            {formData.occupationDetails.yearsOfExperience && (
              <p>Experience: {formData.occupationDetails.yearsOfExperience} years</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}