// components/forms/AddressInfo.jsx
import { useEffect } from 'react';

export default function AddressInfo({ register, errors, watchPresentSameAsPermanent, watch, setValue }) {
  const sameAsPermanent = watchPresentSameAsPermanent;

  useEffect(() => {
    if (sameAsPermanent) {
      const permanentAddress = watch('permanentAddress');
      setValue('presentAddress.street', permanentAddress.street);
      setValue('presentAddress.city', permanentAddress.city);
      setValue('presentAddress.state', permanentAddress.state);
      setValue('presentAddress.postalCode', permanentAddress.postalCode);
      setValue('presentAddress.country', permanentAddress.country);
    }
  }, [sameAsPermanent, watch, setValue]);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Address Information</h2>

      {/* Permanent Address */}
      <div className="border-b pb-6">
        <h3 className="text-xl font-medium text-gray-800 mb-4">Permanent Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
            <input
              {...register('permanentAddress.street')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="123 Main Street"
            />
            {errors.permanentAddress?.street && (
              <p className="mt-1 text-sm text-red-600">{errors.permanentAddress.street.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
            <input
              {...register('permanentAddress.city')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Dhaka"
            />
            {errors.permanentAddress?.city && (
              <p className="mt-1 text-sm text-red-600">{errors.permanentAddress.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
            <input
              {...register('permanentAddress.state')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Dhaka"
            />
            {errors.permanentAddress?.state && (
              <p className="mt-1 text-sm text-red-600">{errors.permanentAddress.state.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
            <input
              {...register('permanentAddress.postalCode')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="1212"
            />
            {errors.permanentAddress?.postalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.permanentAddress.postalCode.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <input
              {...register('permanentAddress.country')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Present Address */}
      <div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            {...register('presentAddress.sameAsPermanent')}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 text-sm text-gray-700">
            Same as permanent address
          </label>
        </div>

        {!sameAsPermanent && (
          <>
            <h3 className="text-xl font-medium text-gray-800 mb-4">Present Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  {...register('presentAddress.street')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="456 Current Street"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  {...register('presentAddress.city')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Chittagong"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  {...register('presentAddress.state')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Chittagong"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                <input
                  {...register('presentAddress.postalCode')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="4000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input
                  {...register('presentAddress.country')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}