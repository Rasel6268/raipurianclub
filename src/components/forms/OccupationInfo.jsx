// components/forms/OccupationInfo.jsx
import { useEffect } from 'react';

export default function OccupationInfo({ register, errors, watch }) {
  const occupation = watch('occupation');

  useEffect(() => {
    // Reset occupation details when occupation changes
    if (occupation === 'student' || occupation === 'unemployed' || occupation === 'retired') {
      // You might want to clear fields here
    }
  }, [occupation]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Occupation Information</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Occupation Type *</label>
        <select
          {...register('occupation')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="student">Student</option>
          <option value="employed">Employed</option>
          <option value="self_employed">Self Employed</option>
          <option value="business">Business</option>
          <option value="unemployed">Unemployed</option>
          <option value="retired">Retired</option>
          <option value="other">Other</option>
        </select>
        {errors.occupation && (
          <p className="mt-1 text-sm text-red-600">{errors.occupation.message}</p>
        )}
      </div>

      {(occupation === 'employed' || occupation === 'self_employed' || occupation === 'business') && (
        <div className="border-t pt-6">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Occupation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {occupation === 'business' ? 'Business Name' : 'Company Name'}
              </label>
              <input
                {...register('occupationDetails.companyName')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder={occupation === 'business' ? 'Business Name' : 'Company Name'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {occupation === 'business' ? 'Business Type' : 'Position'}
              </label>
              <input
                {...register('occupationDetails.position')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder={occupation === 'business' ? 'e.g., Retail, Service' : 'e.g., Manager, Developer'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <input
                {...register('occupationDetails.yearsOfExperience', { valueAsNumber: true })}
                type="number"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Years"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <input
                {...register('occupationDetails.industry')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., IT, Healthcare, Education"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}