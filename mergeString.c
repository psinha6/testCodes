#include <stdio.h>
#include<string.h>

int main() {
	//code
	int test_cases;
	scanf("%d",&test_cases);
	int i;
	for(i=0;i<test_cases;i++) {
	    char str1[10000];
	    char str2[10000];
	    scanf("%s", str1);
	    scanf("%s", str2);
	    int length1 = strlen(str1);
	    int length2 = strlen(str2);
	    int j = 0, k = 0;
	    int bigLen = length1 > length2?length1:length2;
	    printf("%d", bigLen);
	    int ii = 0;
	    while(ii < bigLen){
	        if(str1[j] != '\0'){
	            printf("%c", str1[j++]);
	        }
	        if(str2[k] != '\0'){
	            printf("%c", str2[k++]);
	            
	        }
	        ii++;
	    }
	    
	}
	return 0;
}
