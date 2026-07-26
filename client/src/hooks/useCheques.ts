import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import chequeServiceClient from "../services/chequeServiceClient";
import { ChequeFormType, ChequeType } from "../../types";

export const useCheques = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['cheques'],
    queryFn: chequeServiceClient.getCheques,
    refetchOnWindowFocus: false
  })

  const newChequeMutation = useMutation({
    mutationFn: chequeServiceClient.createNew,
    onSuccess: (newCheque: ChequeType) => {
      const cheques: ChequeType[] | undefined = queryClient.getQueryData(['cheques'])
      if (cheques) queryClient.setQueryData(['cheques'], cheques.concat(newCheque))
    }
  })

  const submitChequeMutation = useMutation({
    mutationFn: chequeServiceClient.submit,
    onSuccess: (_data, variables) => {
      //queryClient.invalidateQueries({ queryKey: ['cheques'] })
      const cheques: ChequeType[] | undefined = queryClient.getQueryData(['cheques'])
      if (cheques) queryClient.setQueryData(['cheques'], cheques.map(c => c.id !== variables ? c : { ...c, submitted: true } ))
    }
  })

  const changeRealisationDateMutation = useMutation({
    mutationFn: chequeServiceClient.changeRealDate,
    onSuccess: (_data, { newdate, id }) => {
      //queryClient.invalidateQueries({ queryKey: ['cheques'] })
      const cheques: ChequeType[] | undefined = queryClient.getQueryData(['cheques'])
      if (cheques) queryClient.setQueryData(['cheques'], cheques.map(c => c.id !== id ? c : { ...c, realisation_date: newdate } ))
    }
  })

  const deleteChequeMutation = useMutation({
    mutationFn: chequeServiceClient.deleteCheque,
    onSuccess: (_data, variables) => {
      //console.log("RQ: Deletion successful")
      //queryClient.invalidateQueries({ queryKey: ['cheques'] })
      const cheques: ChequeType[] | undefined = queryClient.getQueryData(['cheques'])
      if (cheques) queryClient.setQueryData(['cheques'], cheques.filter(c => c.id !== variables))
    }
  })

  return {
    cheques: result.data,
    isPending: result.isPending,
    addCheque: (chequeToAdd: ChequeFormType) => newChequeMutation.mutate(chequeToAdd),
    submitCheque: (id: string) => submitChequeMutation.mutate(id),
    changeRealisationDate: (newdate: string, id: string) => changeRealisationDateMutation.mutate({ newdate, id }),
    deleteCheque: (id: string) => deleteChequeMutation.mutate(id) 
  }
}