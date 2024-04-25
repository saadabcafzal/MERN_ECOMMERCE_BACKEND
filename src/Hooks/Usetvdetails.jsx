import { useDispatch } from "react-redux";
import axios from "../utilis/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addtvshow, removetvshow } from "../utilis/tvshowslice";

const Usetvdetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gettvsuggestion = async () => {
    try {
      const details = await axios.get(`/tv/${id}`);
      const external_ids = await axios.get(`/tv/${id}/external_ids`);
      const recommendations = await axios.get(`/tv/${id}/recommendations`);
      const similar = await axios.get(`/tv/${id}/similar`);
      const videos = await axios.get(`/tv/${id}/videos`);
      const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
      const translations = await axios.get(`/tv/${id}/translations`);
     
      let theultimatedetails = {
        detail: details.data,
        external_ids: external_ids.data,
        recommendations: recommendations?.data.results,
        similar: similar.data.results,
        videos: videos.data.results.filter((m) => m.type === "Trailer")[0],
        wastchproviders: watchproviders.data.results.IN,
        translations: translations,
      };
      dispatch(addtvshow(theultimatedetails));
     
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gettvsuggestion();
    return () => {
      dispatch(removetvshow());
    };
  }, [id]);
};

export default Usetvdetails;