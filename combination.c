/* Program to print all combination of size r in an array of size n */
#include <stdio.h>
void combinationUtil(int arr[], int data[], int start, int end, 
					int index, int r, int *count);

// The main function that prints all combinations of size r
// in arr[] of size n. This function mainly uses combinationUtil()
void printCombination(int arr[], int n, int r, int *count)
{
	// A temporary array to store all combination one by one
	int data[r];

	// Print all combination using temprary array 'data[]'
	combinationUtil(arr, data, 0, n-1, 0, r, &count);
}

/* arr[] ---> Input Array
data[] ---> Temporary array to store current combination
start & end ---> Staring and Ending indexes in arr[]
index ---> Current index in data[]
r ---> Size of a combination to be printed */
void combinationUtil(int arr[], int data[], int start, int end,
					int index, int r, int *count)
{
	// Current combination is ready to be printed, print it
	if (index == r)
	{
		for (int j=0; j<r; j++){
			count++;
			printf("%d ", data[j]);
		}
		printf("\n");
		return;
	}

	// replace index with all possible elements. The condition
	// "end-i+1 >= r-index" makes sure that including one element
	// at index will make a combination with remaining elements
	// at remaining positions
	for (int i=start; i<=end && end-i+1 >= r-index; i++)
	{
		data[index] = arr[i];
		combinationUtil(arr, data, i+1, end, index+1, r, &count);
	}
}

// Driver program to test above functions
int main()
{
	int arr[] = {1, 2, 3, 4, 5};
	int r = 3;
	int n = sizeof(arr)/sizeof(arr[0]);
	int count = 0;
	for(int i = 0; i < n; i ++)
	printCombination(arr, n, i, &count);
	printf("count = %d", count);
}

