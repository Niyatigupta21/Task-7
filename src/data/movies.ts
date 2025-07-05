import { Movie } from '@/types/movie';
import starlightPoster from '@/assets/movie-starlight.jpg';
import oceanPoster from '@/assets/movie-ocean.jpg';
import romancePoster from '@/assets/movie-romance.jpg';
import horrorPoster from '@/assets/movie-horror.jpg';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Starlight Chronicles',
    genre: 'Sci-Fi Adventure',
    duration: 142,
    rating: 'PG-13',
    description: 'An epic space adventure that follows a crew of explorers as they journey to the far reaches of the galaxy in search of a new home for humanity.',
    poster: starlightPoster,
    showtimes: [
      {
        id: 'st1',
        movieId: '1',
        time: '14:30',
        date: '2024-07-05',
        theater: 'Screen 1',
        price: 12.50,
        availableSeats: 89,
        totalSeats: 120
      },
      {
        id: 'st2',
        movieId: '1',
        time: '17:45',
        date: '2024-07-05',
        theater: 'Screen 1',
        price: 15.00,
        availableSeats: 102,
        totalSeats: 120
      },
      {
        id: 'st3',
        movieId: '1',
        time: '21:00',
        date: '2024-07-05',
        theater: 'Screen 2',
        price: 15.00,
        availableSeats: 67,
        totalSeats: 120
      }
    ]
  },
  {
    id: '2',
    title: "Ocean's Fury",
    genre: 'Action Thriller',
    duration: 118,
    rating: 'PG-13',
    description: 'A thrilling underwater adventure where a team of marine biologists must survive the depths of the ocean when their research station comes under attack.',
    poster: oceanPoster,
    showtimes: [
      {
        id: 'st4',
        movieId: '2',
        time: '15:15',
        date: '2024-07-05',
        theater: 'Screen 3',
        price: 12.50,
        availableSeats: 94,
        totalSeats: 120
      },
      {
        id: 'st5',
        movieId: '2',
        time: '18:30',
        date: '2024-07-05',
        theater: 'Screen 3',
        price: 15.00,
        availableSeats: 78,
        totalSeats: 120
      },
      {
        id: 'st6',
        movieId: '2',
        time: '21:45',
        date: '2024-07-05',
        theater: 'Screen 1',
        price: 15.00,
        availableSeats: 45,
        totalSeats: 120
      }
    ]
  },
  {
    id: '3',
    title: 'City Lights Romance',
    genre: 'Romantic Comedy',
    duration: 96,
    rating: 'PG',
    description: 'A heartwarming romantic comedy about two strangers who meet during a citywide blackout and discover that sometimes the best connections happen in the dark.',
    poster: romancePoster,
    showtimes: [
      {
        id: 'st7',
        movieId: '3',
        time: '16:00',
        date: '2024-07-05',
        theater: 'Screen 4',
        price: 11.00,
        availableSeats: 110,
        totalSeats: 120
      },
      {
        id: 'st8',
        movieId: '3',
        time: '19:15',
        date: '2024-07-05',
        theater: 'Screen 4',
        price: 13.50,
        availableSeats: 88,
        totalSeats: 120
      }
    ]
  },
  {
    id: '4',
    title: 'Midnight Shadows',
    genre: 'Horror',
    duration: 105,
    rating: 'R',
    description: 'A psychological horror film that follows a group of friends who venture into an abandoned forest where supernatural forces begin to hunt them one by one.',
    poster: horrorPoster,
    showtimes: [
      {
        id: 'st9',
        movieId: '4',
        time: '20:00',
        date: '2024-07-05',
        theater: 'Screen 2',
        price: 13.50,
        availableSeats: 72,
        totalSeats: 120
      },
      {
        id: 'st10',
        movieId: '4',
        time: '22:30',
        date: '2024-07-05',
        theater: 'Screen 2',
        price: 15.00,
        availableSeats: 58,
        totalSeats: 120
      }
    ]
  }
];