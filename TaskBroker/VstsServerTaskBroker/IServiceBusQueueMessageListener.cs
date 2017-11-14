using System;
using System.Threading.Tasks;

namespace VstsServerTaskHelper
{
    public interface IServiceBusQueueMessageListener
    {
        void Start(Func<IBrokeredMessageWrapper, Task> messageHandlerFunc);

        void Stop();

		Task CompleteAsync(string lockToken);
		
		Task AbandonAsync(string lockToken);

		Task DeadLetterAsync(string lockToken);
	}
}