#include <stdio.h>

int main() {
	//code
	int test_cases;
	scanf("%d",&test_cases);
	int n;
	long long int k,product;
	int start,end,count;
	int arr[100000];
	int i;
	for(i=0;i<test_cases;i++)
	{
	    scanf("%d %lld",&n,&k);
	    start=0;
	    end=0;
	    product=1;
	    count=0;
	    int j;
	    for(j=0;j<n;j++)
	    {
	        scanf("%d",&arr[j]);
	        product=product*arr[j];
	        end++;
            while(product>=k && start<=end)
            {
                product=product/arr[start];
	            start++;
	        }
	        if(start<end){
	        	printf("%d ", count);
	        	count=count+end-start;
			}
	    }
	    printf("\n%d\n",count);
	}
	return 0;
}
