import { useEffect, useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  created_at: string;
}

const reviewSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  rating: z.number().min(1, "Please select a rating").max(5),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const ReviewsPage = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    message: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, rating, message, created_at")
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReviews(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const validatedData = reviewSchema.parse(formData);

      const { error } = await supabase.from("reviews").insert({
        name: validatedData.name,
        email: validatedData.email,
        rating: validatedData.rating,
        message: validatedData.message,
      });

      if (error) throw error;

      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback. Your review will be visible after approval.",
      });

      setFormData({ name: "", email: "", rating: 5, message: "" });
      setShowForm(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit review. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "fill-gold text-gold" : "text-muted-foreground"
            } ${interactive ? "cursor-pointer hover:text-gold" : ""}`}
            onClick={interactive ? () => setFormData({ ...formData, rating: star }) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-gold font-medium tracking-widest uppercase mb-4">
                Testimonials
              </p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Customer Reviews
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Read what our happy customers have to say about their experience with us.
              </p>
              <Button variant="hero" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Write a Review"}
              </Button>
            </div>

            {/* Review Form */}
            {showForm && (
              <div className="max-w-2xl mx-auto mb-16">
                <div className="bg-card p-8 rounded-3xl border border-border shadow-md">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                    Share Your Experience
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Rating
                      </label>
                      {renderStars(formData.rating, true)}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Review
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-all resize-none"
                        placeholder="Share your experience with us..."
                        required
                      />
                    </div>
                    <Button variant="hero" size="xl" className="w-full" disabled={submitting}>
                      {submitting ? "Submitting..." : "Submit Review"}
                    </Button>
                  </form>
                </div>
              </div>
            )}

            {/* Reviews List */}
            {loading ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Loading reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-20">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No reviews yet.</p>
                <p className="text-muted-foreground">Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">{review.name}</h3>
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-muted-foreground mb-4">{review.message}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewsPage;
