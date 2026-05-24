import { User } from "lucide-react";

interface Master {
  name: string;
  dateOfBirth?: string | undefined;
  photo?: string | undefined;
  description?: string | undefined;
}

interface MastersListProps {
  masters: Master[];
}

export default function MastersList({ masters }: MastersListProps) {
  if (masters.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {masters.map((master) => (
        <div
          key={master.name}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          {/* Master Photo */}
          <div className="h-64 overflow-hidden bg-gray-200 flex items-center justify-center">
            {master.photo ? (
              <img
                src={master.photo}
                alt={master.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-linear-to-br from-purple-400 to-blue-500 w-full h-full flex items-center justify-center">
                <User className="w-24 h-24 text-white" />
              </div>
            )}
          </div>

          {/* Master Details */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {master.name}
            </h3>

            {master.description && (
              <p className="text-gray-600 text-sm line-clamp-4">
                {master.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
