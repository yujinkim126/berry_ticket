import { getConcertDetail, getConcerts } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useConcertQuery = () => {
  return useQuery({
    queryKey: ["concerts"],
    queryFn: getConcerts,
    select: (data) => data.response,
  });
};

export const useConcertDetailQuery = (prodId) => {
  return useQuery({
    queryKey: ["concertDetail"],
    queryFn: () => getConcertDetail(prodId),
    select: (data) => data.response,
  });
};
