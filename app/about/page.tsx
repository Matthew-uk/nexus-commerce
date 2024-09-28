import {
  Star,
  ArrowRight,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Navbar from "@/components/ui/custom/navbar";
// import Img1 from "./../../img/mac_img.png";
// import Img2 from "@/img/IMG_0776.jpeg";
// import Img3 from "@/img/553510.jpg";

export default function LandingPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <Navbar />
      {/* <header className="sticky top-0 z-50 bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Menu className="h-6 w-6 cursor-pointer md:hidden" />
                        <h1 className="text-2xl font-bold text-primary">TechGadgetStore</h1>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        <Link href="#" className="text-gray-600 hover:text-primary">Home</Link>
                        <Link href="#" className="text-gray-600 hover:text-primary">Products</Link>
                        <Link href="#" className="text-gray-600 hover:text-primary">About</Link>
                        <Link href="#" className="text-gray-600 hover:text-primary">Contact</Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Search className="h-6 w-6 text-gray-400 cursor-pointer" />
                        <ShoppingCart className="h-6 w-6 text-gray-400 cursor-pointer" />
                    </div>
                </div>
            </header> */}

      <main className='flex-grow'>
        {/* Hero Section */}
        <section className='bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
          <div className='container mx-auto px-4 py-20 flex flex-col md:flex-row items-center'>
            <div className='md:w-1/2 mb-10 md:mb-0'>
              <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                Welcome to NexusMart
              </h1>
              <p className='text-xl mb-6'>
                Discover the latest in computer technology and gadgets.
              </p>
              <Button
                size='lg'
                className='bg-white text-blue-500 hover:bg-gray-100'>
                <Link href={"/"} className='flex'>
                  Shop Now <ArrowRight className='ml-2 h-5 w-5' />
                </Link>
              </Button>
            </div>
            <div className='md:w-1/2'>
              <img
                src='https://g-ycrmd35tgas.vusercontent.net/placeholder.svg?height=200&width=600&text=Hero Image'
                alt='Tech Gadgets'
                className='rounded-lg shadow-lg'
              />
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className='py-16 bg-gray-100'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold mb-8 text-center text-gray-950'>
              Featured Categories
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              {[
                {
                  name: "Laptops",
                  image:
                    "https://storage.googleapis.com/next-ecommerce-404013.appspot.com/uploads/mac_img.png?GoogleAccessId=firebase-adminsdk-quqte%40next-ecommerce-404013.iam.gserviceaccount.com&Expires=1859180581&Signature=Q79Nix6XPqUGCyRUAH1IU1PBjY0DCmWDvN07ITipe%2BtEep1KjScW5KsVlvmlMMggLdWsr0tVD%2BChkqBQxILkgiMW%2B5biO6dvxEE32yf1CL1%2BGD0BMEstVt2TBw3C0zMv3evWFjtSQkhorOc8xZ7HVMBvN5HC2Q77UwUGqQ85x9NB8w%2F3VVZsEvoA3KGz8HZ4cinuY%2BkyHE3R%2BfYZnfBlINH7D5NCCnSyNz6p9r7oo1sMKPRqgHHDVCE9SbbJHFbJ4lX9fqkirC%2FgElef5RjIbBSq9jIEdpHYFrEni%2BCensSdpsIo8TpAL4VVmxftCC%2BjfHu3FUTNFF4bpy0%2FtBS3ag%3D%3D",
                },
                {
                  name: "Fashion",
                  image:
                    "https://img.freepik.com/free-photo/flat-lay-composition-different-traveling-elements_23-2148884945.jpg?t=st=1727007616~exp=1727011216~hmac=002f354de897fd171ddb6dafd17fdc152a5069c76a286fd68519e1931fb6a27a&w=1800",
                },
                {
                  name: "Accessories",
                  image:
                    "https://img.freepik.com/free-photo/still-life-casual-man-modern-male-accessories-laptop-white_155003-3939.jpg?t=st=1727007513~exp=1727011113~hmac=336dae3751153b9fa34cc6e046925e78ae2351e8da38778dbed356c78c9b62d1&w=2000",
                },
                {
                  name: "Phones",
                  image:
                    "https://storage.googleapis.com/next-ecommerce-404013.appspot.com/uploads/IMG_0776.jpeg?GoogleAccessId=firebase-adminsdk-quqte%40next-ecommerce-404013.iam.gserviceaccount.com&Expires=1859107128&Signature=a0HQtC1BKRGu9XBa2JpqwUai50kOExoCCBo4tXPG73xCbWCv%2FK0KB7EIPHb2TZCnqrK7jy%2FR4f6%2B5OZyW3abEyO2q6Ib9Oru97VrTVmGmLEe0N6p9uGgBprfwJzKjm3CU7MI%2B6ozqzai%2FChGhkFBL4Plz6n%2BuwbjMqJ2QM5KHicVzKC48EI3H4BjFMMiwcNCPzUmUn%2FoLmlgBXQAgNsJ1DKLpg%2Bcq0T72Iw08xbTLJZ2LIX7WVrds%2BYzsDcX1NHHwVxS%2BmNNwvmVuwnudmP9e3HB9J6BFvgsX4POjTt13xeuuABzFYkfpNDdd3mk%2Fjl3Atd3i9MXXlDvFW9t32T7mw%3D%3D",
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className='bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow'>
                  <img
                    src={`${category.image}`}
                    alt={category.name}
                    className='w-40 h-28 mx-auto mb-4'
                  />
                  <h3 className='text-lg font-semibold text-gray-950'>
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold mb-8 text-center'>
              Special Offers
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='bg-yellow-100 rounded-lg p-6 flex items-center'>
                <div>
                  <h3 className='text-2xl font-bold mb-2 text-gray-950'>
                    Summer Sale
                  </h3>
                  <p className='mb-4 text-gray-950'>
                    Get up to 30% off on selected items!
                  </p>
                  <Button>Shop Now</Button>
                </div>
                <img
                  src='https://g-ycrmd35tgas.vusercontent.net/placeholder.svg?height=150&width=150&text=Sale'
                  alt='Summer Sale'
                  className='w-32 h-32 ml-auto'
                />
              </div>
              <div className='bg-green-100 rounded-lg p-6 flex items-center'>
                <div>
                  <h3 className='text-2xl font-bold mb-2 text-gray-950'>
                    Bundle & Save
                  </h3>
                  <p className='mb-4 text-gray-950'>
                    Create your perfect setup and save 15%!
                  </p>
                  <Button>Build Your Bundle</Button>
                </div>
                <img
                  src='https://g-ycrmd35tgas.vusercontent.net/placeholder.svg?height=150&width=150&text=Bundle'
                  alt='Bundle Offer'
                  className='w-32 h-32 ml-auto'
                />
              </div>
            </div>
          </div>
        </section>

        {/* Latest Products */}
        <section className='py-16 bg-gray-100'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold mb-8 text-center text-gray-950'>
              Latest Products
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className='bg-white rounded-lg shadow-md overflow-hidden'>
                  <img
                    src={`https://g-ycrmd35tgas.vusercontent.net/placeholder.svg?height=200&width=300&text=Product ${
                      index + 1
                    }`}
                    alt={`Product ${index + 1}`}
                    className='w-full h-48 object-cover'
                  />
                  <div className='p-4'>
                    <h3 className='text-lg font-semibold mb-2 text-gray-950'>
                      Product {index + 1}
                    </h3>
                    <p className='text-gray-600 mb-2'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className='flex justify-between items-center'>
                      <span className='text-primary font-bold'>
                        ${(Math.random() * 1000).toFixed(2)}
                      </span>
                      <Button size='sm'>Add to Cart</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='text-center mt-8'>
              <Button variant='outline'>
                <span className='text-gray-950'>View All Products</span>{" "}
                <ChevronRight className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold mb-8 text-center'>
              What Our Customers Say
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {[...Array(3)].map((_, index) => (
                <div key={index} className='bg-white rounded-lg shadow-md p-6'>
                  <div className='flex items-center mb-4'>
                    <img
                      src={`https://g-ycrmd35tgas.vusercontent.net/placeholder.svg?height=50&width=50&text=User`}
                      alt={`Customer ${index + 1}`}
                      className='w-12 h-12 rounded-full mr-4'
                    />
                    <div>
                      <h3 className='font-semibold text-gray-950'>
                        Customer {index + 1}
                      </h3>
                      <div className='flex'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className='h-4 w-4 text-yellow-400 fill-current'
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className='text-gray-600'>
                    "Great products and excellent customer service! I highly
                    recommend TechGadgetStore for all your tech needs."
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className='py-16 bg-gray-100'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl font-bold mb-4 text-gray-950'>
              Stay Updated
            </h2>
            <p className='text-xl mb-8 text-gray-950'>
              Subscribe to our newsletter for the latest deals and tech news!
            </p>
            <div className='flex justify-center'>
              <Input
                type='email'
                placeholder='Enter your email'
                className='w-full max-w-md rounded-r-none'
              />
              <Button className='rounded-l-none'>Subscribe</Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='bg-gray-800 text-white'>
        <div className='container mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>About Us</h3>
              <p className='text-gray-400'>
                TechGadgetStore is your one-stop shop for all things tech. We
                offer a wide range of computers and computing gadgets at
                competitive prices.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
              <ul className='space-y-2'>
                <li>
                  <Link href='#' className='text-gray-400 hover:text-white'>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href='#' className='text-gray-400 hover:text-white'>
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href='#' className='text-gray-400 hover:text-white'>
                    Shipping Information
                  </Link>
                </li>
                <li>
                  <Link href='#' className='text-gray-400 hover:text-white'>
                    Returns & Exchanges
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
              <p className='text-gray-400'>
                123 Tech Street, Gadget City, 12345
              </p>
              <p className='text-gray-400'>Phone: (123) 456-7890</p>
              <p className='text-gray-400'>Email: info@techgadgetstore.com</p>
            </div>
          </div>
          <div className='mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-400'>
              &copy; 2023 TechGadgetStore. All rights reserved.
            </p>
            <div className='flex space-x-4 mt-4 md:mt-0'>
              <Facebook className='h-6 w-6 text-gray-400 cursor-pointer hover:text-white' />
              <Twitter className='h-6 w-6 text-gray-400 cursor-pointer hover:text-white' />
              <Instagram className='h-6 w-6 text-gray-400 cursor-pointer hover:text-white' />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
