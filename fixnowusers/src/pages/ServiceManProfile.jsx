import { useState } from "react";
import {
  User,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Phone,
  Mail,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router";
import { useParams } from "react-router";
const ServicemanProfile = () => {
  const [showBooking, setShowBooking] = useState(false);
  let { man_id } = useParams();

  // Serviceman Data
  const serviceman = {
    name: "Rajesh Kumar",
    photo: null,
    rating: 4.8,
    totalReviews: 127,
    experience: "8 years",
    address: "123, Shanti Nagar, Ahmedabad, Ahmedabad, Gujarat - 395009",
    qualification: "ITI Electrician, Certified HVAC Technician",
    services: ["Electrician", "AC Repair", "Appliance Repair"],
    phone: "+91 98765 43210",
    email: "rajesh.kumar@example.com",
    pricePerHour: 500,
    availability: "Available",
  };

  // Reviews Data
  const reviews = [
    {
      id: 1,
      customerName: "Priya Shah",
      customerPhoto: null,
      rating: 5,
      timeAgo: "2 days ago",
      review:
        "Excellent service! Rajesh fixed my AC within an hour. Very professional and knowledgeable. Highly recommend!",
    },
    {
      id: 2,
      customerName: "Amit Patel",
      customerPhoto: null,
      rating: 4,
      timeAgo: "1 week ago",
      review:
        "Good work on electrical wiring. Came on time and completed the job efficiently. Will call again.",
    },
    {
      id: 3,
      customerName: "Neha Desai",
      customerPhoto: null,
      rating: 5,
      timeAgo: "2 weeks ago",
      review:
        "Amazing experience! He diagnosed the problem quickly and fixed it perfectly. Very polite and professional behavior.",
    },
    {
      id: 4,
      customerName: "Suresh Mehta",
      customerPhoto: null,
      rating: 4,
      timeAgo: "3 weeks ago",
      review:
        "Reliable and skilled. Fixed multiple electrical issues in one visit. Fair pricing too.",
    },
    {
      id: 5,
      customerName: "Kavita Joshi",
      customerPhoto: null,
      rating: 5,
      timeAgo: "1 month ago",
      review:
        "Best electrician I've found in Ahmedabad! Very punctual and thorough with his work. Cleaned up after finishing too.",
    },
    {
      id: 6,
      customerName: "Vikram Singh",
      customerPhoto: null,
      rating: 5,
      timeAgo: "1 month ago",
      review:
        "Highly skilled professional. Repaired my refrigerator which others said needed replacement. Saved me a lot of money!",
    },
    {
      id: 7,
      customerName: "Manish Trivedi",
      customerPhoto: null,
      rating: 4,
      timeAgo: "2 months ago",
      review:
        "Good service and reasonable rates. Would definitely recommend to others.",
    },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-24"></div>

          <div className="px-6 pb-6">
            {/* Profile Image */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12">
              <div className="w-24 h-24 rounded-full bg-white p-1 shadow-xl">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center overflow-hidden">
                  {serviceman.photo ? (
                    <img
                      src={serviceman.photo}
                      alt={serviceman.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-white" />
                  )}
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-800">
                  {serviceman.name}
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star
                      size={18}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="font-semibold text-gray-700">
                      {serviceman.rating}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({serviceman.totalReviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold text-sm">
                {serviceman.availability}
              </div>
            </div>

            {/* Services */}
            <div className="flex flex-wrap gap-2 mt-4">
              {serviceman.services.map((service, idx) => (
                <span
                  key={idx}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  {service}
                </span>
              ))}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase size={20} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Experience</div>
                  <div className="font-semibold text-gray-800">
                    {serviceman.experience}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={20} className="text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Qualification</div>
                  <div className="font-semibold text-gray-800">
                    {serviceman.qualification}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-semibold text-gray-800">
                    {serviceman.address}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Pricing */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
              <div className="flex-1">
                <div className="text-sm text-gray-500 mb-1">Rate</div>
                <div className="text-2xl font-bold text-blue-600">
                  ₹{serviceman.pricePerHour}/hour
                </div>
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <Phone size={20} />
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Star size={24} className="text-yellow-400 fill-yellow-400" />
              Customer Reviews ({reviews.length})
            </h2>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Customer Photo */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {review.customerPhoto ? (
                      <img
                        src={review.customerPhoto}
                        alt={review.customerName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={24} className="text-white" />
                    )}
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {review.customerName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={14} />
                        <span>{review.timeAgo}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(review.rating)}
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {review.review}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicemanProfile;
