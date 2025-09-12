import { Star, Users } from "lucide-react";

interface CourseCardProps {
  image: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  users: string;
}

export default function CourseCard({
  image,
  title,
  description,
  instructor,
  rating,
  users,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Instructor:</span> {instructor}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(rating) ? "fill-yellow-500" : ""
                }`}
              />
            ))}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            ({users})
          </div>
        </div>
      </div>
    </div>
  );
}
