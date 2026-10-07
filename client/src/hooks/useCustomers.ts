import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customerServiceClient from "../services/customerServiceClient";
import { CustomerFormType, CustomerType } from "../../types";

export const useCustomers = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['customers'],
    queryFn: customerServiceClient.getCustomers,
    refetchOnWindowFocus: false
  })

  const newCustomerMutation = useMutation({
    mutationFn: customerServiceClient.createNew,
    onSuccess: (newCustomer: CustomerType) => {
      const customers: CustomerType[] | undefined = queryClient.getQueryData(['customers'])
      if (customers) queryClient.setQueryData(['customers'], customers.concat(newCustomer))
    }
  })

  const updateCustomerMutation = useMutation({
    mutationFn: customerServiceClient.updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    }
  })

  return {
    customers: result.data,
    isPending: result.isPending,
    addCustomer: (customerToAdd: CustomerFormType) => newCustomerMutation.mutateAsync(customerToAdd),
    updateCustomer: (newDetails: CustomerType) => updateCustomerMutation.mutate(newDetails),
  }
}