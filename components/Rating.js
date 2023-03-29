import { StarIcon as EmptyStarIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, StarIcon } from '@heroicons/react/24/solid';
import React from 'react';

export default function Rating({ rating, numReviews }) {
  return (
    <div className="flex items-center  text-amber-400">
      {rating >= 0.5 ? (
        <StarIcon className="h-5 w-5" />
      ) : (
        <EmptyStarIcon className="h-5 w-5" />
      )}
      {rating >= 1.5 ? (
        <StarIcon className="h-5 w-5" />
      ) : (
        <EmptyStarIcon className="h-5 w-5" />
      )}
      {rating >= 2.5 ? (
        <StarIcon className="h-5 w-5" />
      ) : (
        <EmptyStarIcon className="h-5 w-5" />
      )}
      {rating >= 3.5 ? (
        <StarIcon className="h-5 w-5" />
      ) : (
        <EmptyStarIcon className="h-5 w-5" />
      )}
      {rating >= 4.5 ? (
        <StarIcon className="h-5 w-5" />
      ) : (
        <EmptyStarIcon className="h-5 w-5" />
      )}{' '}
      {numReviews && (
        <a href="#reviews" className="flex   ">
          {numReviews} <ChevronDownIcon className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}
