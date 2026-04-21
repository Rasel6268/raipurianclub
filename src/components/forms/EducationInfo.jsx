// components/forms/EducationInfo.jsx
import { useState } from 'react';

export default function EducationInfo({ register, errors, setValue, watch }) {
  const [educationList, setEducationList] = useState([]);
  const qualifications = watch('educationalQualification') || [];

  const addEducation = () => {
    const newEducation = {
      degree: '',
      institution: '',
      yearOfPassing: '',
      grade: '',
      currentlyStudying: false,
    };
    const updatedList = [...qualifications, newEducation];
    setValue('educationalQualification', updatedList);
  };

  const removeEducation = (index) => {
    const updatedList = qualifications.filter((_, i) => i !== index);
    setValue('educationalQualification', updatedList);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Educational Qualifications</h2>
        <button
          type="button"
          onClick={addEducation}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          + Add Education
        </button>
      </div>

      {qualifications.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No education added yet. Click the button above to add.</p>
        </div>
      )}

      {qualifications.map((_, index) => (
        <div key={index} className="border rounded-lg p-4 relative">
          <button
            type="button"
            onClick={() => removeEducation(index)}
            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
          >
            ✕
          </button>
          
          <h3 className="font-medium text-gray-700 mb-4">Education #{index + 1}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
              <input
                {...register(`educationalQualification.${index}.degree`)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Bachelor of Science"
              />
              {errors.educationalQualification?.[index]?.degree && (
                <p className="mt-1 text-sm text-red-600">{errors.educationalQualification[index].degree.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Institution *</label>
              <input
                {...register(`educationalQualification.${index}.institution`)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="University Name"
              />
              {errors.educationalQualification?.[index]?.institution && (
                <p className="mt-1 text-sm text-red-600">{errors.educationalQualification[index].institution.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year of Passing</label>
              <input
                {...register(`educationalQualification.${index}.yearOfPassing`, { valueAsNumber: true })}
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="2020"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade/CGPA</label>
              <input
                {...register(`educationalQualification.${index}.grade`)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="3.5 or A"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register(`educationalQualification.${index}.currentlyStudying`)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Currently Studying</span>
              </label>
            </div>
          </div>
        </div>
      ))}

      {errors.educationalQualification && typeof errors.educationalQualification.message === 'string' && (
        <p className="text-sm text-red-600">{errors.educationalQualification.message}</p>
      )}
    </div>
  );
}